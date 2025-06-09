const express = require('express');
const Order = require('../models/Order');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');//populate user field with name field from User model 1.e encode the name and email
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/admin/orders/:id
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        
        // Validate status
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
            });
        }

        const order = await Order.findById(req.params.id).populate("user", "name");
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order fields
        order.status = status;
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        } else if (status === 'Cancelled') {
            order.isDelivered = false;
            order.deliveredAt = undefined;
        }

        // Save with validation
        const updatedOrder = await order.save();
        if (!updatedOrder) {
            return res.status(400).json({ message: 'Failed to update order' });
        }

        res.json(updatedOrder);
    }
    catch (error) {
        console.error('Error updating order:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   DELETE /api/admin/orders/:id
// @desc    Delete an order (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({ message: 'Order removed' });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;