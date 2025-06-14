const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const { protect } = require('../middleware/authMiddleware');
const crypto = require('crypto');

// Create order
router.post('/create-order', protect, async (req, res) => {
    try {
        const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
        
        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: 'Payment gateway not configured' });
        }

        if (!req.body.amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });

        const { amount } = req.body;
        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            payment_capture: 1,
            notes: {
                userId: req.user._id.toString()
            }
        };

        const order = await razorpay.orders.create(options);
        
        if (!order || !order.id) {
            throw new Error('Failed to create Razorpay order');
        }
        
        res.json(order);
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        res.status(500).json({ 
            message: 'Failed to create order',
            error: error.message
        });
    }
});

// Verify payment
router.post('/verify-payment', protect, async (req, res) => {
    try {
        const { RAZORPAY_KEY_SECRET } = process.env;
        
        if (!RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: 'Payment gateway not configured' });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment verification parameters' });
        }

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            res.json({
                verified: true,
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            res.status(400).json({ 
                verified: false, 
                message: 'Invalid payment signature' 
            });
        }
    } catch (error) {
        console.error('Razorpay verification error:', error);
        res.status(500).json({ 
            message: 'Error verifying payment', 
            error: error.message 
        });
    }
});

module.exports = router;
