const express = require('express');
const Checkout = require('../models/Checkout');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/checkout
// @desc    Create new checkout session
// @access  Private
router.post('/', protect, async (req, res) => {
    
        const {
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        } = req.body;

        if (!checkoutItems || checkoutItems.length === 0) {
            return res.status(400).json({ message: 'No items in checkout' });
        }

        try {
            // Create a new checkout session
            const newCheckout = await Checkout.create({
                user: req.user._id,
                checkoutItems: checkoutItems,
                shippingAddress,
                paymentMethod,
                totalPrice,
                paymentStatus: 'pending',
                isPaid: false,
            });
            console.log('Checkout created for user: ${req.user._id}');
            res.status(201).json(newCheckout);
        } catch (error) {
            console.error("Error creating checkout session:", error);
            res.status(500).json({ message: "Server Error"});
        }
});


// @route   PUT /api/checkout/:id/pay
// @desc    Update checkout payment status after sucessful payment
// @access  Private
router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout session not found' });
        }

        // Validate payment status
        if (paymentStatus !== "paid") {
            return res.status(400).json({ message: 'Invalid payment status' });
        }

        // Validate required payment details
        if (!paymentDetails || !paymentDetails.id) {
            return res.status(400).json({ message: 'Payment details are required' });
        }

        // Update checkout payment info
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();

        // --- Auto-finalize and create order here ---
        if (!checkout.isFinalized) {
            try {
                // Fetch user for fallback fields
                const user = await require('../models/User').findById(checkout.user);
                
                // Ensure shipping address fields exist
                if (!checkout.shippingAddress) {
                    throw new Error('Shipping address is required');
                }

                let firstName = checkout.shippingAddress.firstName;
                let lastName = checkout.shippingAddress.lastName;
                let phone = checkout.shippingAddress.phone;
                
                // Use user name as fallback
                if (!firstName && user && user.name) {
                    firstName = user.name.split(' ')[0];
                    lastName = user.name.split(' ').slice(1).join(' ');
                }

                // Set defaults for optional fields
                if (!lastName) lastName = "";
                if (!phone) phone = "";

                // Prepare order items
                const orderItems = checkout.checkoutItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    images: item.image ? [{ url: item.image }] : [],
                    price: item.price,
                    product: item.productId
                }));

                // Prepare shipping address
                const shippingAddress = {
                    firstName,
                    lastName,
                    address: checkout.shippingAddress.address,
                    city: checkout.shippingAddress.city,
                    postalCode: checkout.shippingAddress.postalCode,
                    country: checkout.shippingAddress.country,
                    phone
                };

                // Prepare payment details
                const paymentDetailsObj = {
                    id: paymentDetails.id || "",
                    status: paymentDetails.status || paymentStatus || "paid",
                    type: paymentDetails.type || checkout.paymentMethod || "Razorpay",
                    details: paymentDetails || {}
                };

                // Create final order
                const finalOrder = await Order.create({
                    user: checkout.user,
                    checkoutId: checkout._id,
                    orderItems,
                    shippingAddress,
                    paymentDetails: paymentDetailsObj,
                    totalPrice: checkout.totalPrice,
                    isPaid: true,
                    paidAt: checkout.paidAt,
                    isDelivered: false,
                    status: "pending"
                });

                // Mark checkout as finalized
                checkout.isFinalized = true;
                checkout.finalizedAt = Date.now();
                await checkout.save();

                // Delete the cart
                await Cart.findOneAndDelete({ user: checkout.user });

                return res.status(200).json({ checkout, order: finalOrder });
            } catch (error) {
                console.error('Order creation error:', error);
                return res.status(500).json({ 
                    message: 'Failed to create order',
                    error: error.message 
                });
            }
        }

        await checkout.save();
        return res.status(200).json({ checkout });
    } catch (error) {
        console.error('Payment processing error:', error);
        return res.status(500).json({ 
            message: "Payment processing failed",
            error: error.message
        });
    }
});

// @route   POST /api/checkout/:id/finalize
// @desc    Finalize checkout session and convert to order after successful payment
// @access  Private
router.post('/:id/finalize', protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout session not found' });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // Fetch user for fallback fields
            const user = await require('../models/User').findById(checkout.user);
            let firstName = checkout.shippingAddress.firstName;
            let lastName = checkout.shippingAddress.lastName;
            let phone = checkout.shippingAddress.phone;
            if (!firstName && user && user.name) {
                firstName = user.name.split(' ')[0];
                lastName = user.name.split(' ').slice(1).join(' ');
            }
            if (!lastName) lastName = "";
            if (!phone) phone = "";

            // Map checkoutItems to orderItems with required fields
            const orderItems = checkout.checkoutItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                images: item.image ? [{ url: item.image }] : [],
                price: item.price,
                product: item.productId // ensure this is set in checkoutItems
            }));

            // Ensure shippingAddress has all required fields
            const shippingAddress = {
                firstName,
                lastName,
                address: checkout.shippingAddress.address,
                city: checkout.shippingAddress.city,
                postalCode: checkout.shippingAddress.postalCode,
                country: checkout.shippingAddress.country,
                phone
            };

            // Ensure paymentDetails has all required fields
            const paymentDetails = {
                id: checkout.paymentDetails?.id || "",
                status: checkout.paymentDetails?.status || checkout.paymentStatus || "paid",
                type: checkout.paymentDetails?.type || checkout.paymentMethod || "Razorpay",
                details: checkout.paymentDetails || {}
            };

            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                checkoutId: checkout._id,
                orderItems,
                shippingAddress,
                paymentDetails,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                status: "pending"
            });

            //marl the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            //delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(200).json(finalOrder);
        } else if(checkout.isFinalized) {
            res.status(400).json({ message: 'Checkout session is already finalized' });
        } else {
            res.status(400).json({ message: 'Checkout session is not paid' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"} );
    }
});

module.exports = router;
