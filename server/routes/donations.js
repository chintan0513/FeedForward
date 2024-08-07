
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Order = require('../models/donationScema');
const User = require('../models/user')
const upload = require('../middlewares/multer');

// Create a new order with multiple donations
router.post('/addOrder', upload.any(), async (req, res) => {
  try {
    const donations = [];

    const checkUser = req.body.email;
    console.log(checkUser)
    const user = await User.findOne({email: checkUser})
    if (!user) {
      return res.json({message: 'User does not exist!'})
    }

    req.files.forEach((file, index) => {
      const donation = {
        name: req.body[`name${index}`],
        quantity: req.body[`quantity${index}`],
        description: req.body[`description${index}`],
        expiryDate: req.body[`expiryDate${index}`],
        image: file.path
      };
      donations.push(donation);
    });

    if (donations.length == 0) {
      return res.json({message: "Donations cannot be empty!"})
    }

    const newOrder = new Order({
      donations: donations,
      createdBy: user._id
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error in /addOrder:", error);
    res.status(500).json({ message: "Server error while creating order", error: error.toString() });
  }
});

router.get('/available-donations', async (req, res) => {
  try {
    const orders = await Order.find({ claimed: false }).populate('createdBy', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in /available-orders:", error);
    res.status(500).json({ message: "Error fetching available orders", error: error.toString() });
  }
});


router.post('/orders/:orderId/place', async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.claimed = true;
    order.claimedBy = email;
    order.mobileNumber = mobileNumber;
    order.claimedAt = new Date();

    await order.save();
    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error while placing order', error: error.toString() });
  }
});

// Delete an order
router.delete('/orders/:orderId', async (req, res) => {
  try {
    console.log("dd")
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

// Update an order
router.put('/orders/:orderId', async (req, res) => {
  const { name, quantity, description, expiryDate } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { name, quantity, description, expiryDate }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Get donations by a specific user
router.get('/donations/byUser/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("user", user)
    if (!user) {
      return res.status(404).json({ message: 'User does not exist!' });
    }

    const donations = await Order.find({ createdBy: user }).populate('donations');
    console.log("donations", donations);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: "Server error while fetching donations", error: error.toString() });
  }
});

module.exports = router;
