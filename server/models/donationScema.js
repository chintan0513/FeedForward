// const mongoose = require('mongoose');

// const donationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   description: { type: String, required: true },
//   expiryDate: { type: Date, required: true },
//   image: { type: String, required: false } // Path to the image file
// });

// const orderSchema = new mongoose.Schema({
//   donations: [donationSchema],
//   claimed: { type: Boolean, default: false },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;


const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  image: { type: String, required: false } // Path to the image file
});

const orderSchema = new mongoose.Schema({
  donations: [donationSchema],
  claimed: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model
  claimedBy: { type: String, required: false }, // Email of the person who claimed the order
  mobileNumber: { type: String, required: false }, // Mobile number of the person who claimed the order
  claimedAt: { type: Date, required: false } // Timestamp for when the order was claimed
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
