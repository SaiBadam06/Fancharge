const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            checkoutId,
            orderItems,
            shippingAddress,
            paymentDetails,
            totalPrice,
            isPaid,
            paidAt
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = await Order.create({
            user: req.user._id,
            checkoutId,
            orderItems,
            shippingAddress,
            paymentDetails,
            totalPrice,
            isPaid,
            paidAt
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
});

// @route   GET /api/orders/my-orders
// @desc    Get logged in user orders
// @access  Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        // Find all orders for the logged in user
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });//-1 => most recent orders on top
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        });
    }
});


// @route   GET /api/orders/:id
// @desc    Get order details by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure user can only access their own orders
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this order' });
        }

        //Return the full order details
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            message: 'Error fetching order',
            error: error.message
        });
    }
});



module.exports = router;
