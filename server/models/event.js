const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true }, // Assuming photo will be stored as URL or path
  address: { type: String, required: true },
  date: { type: Date, required: true },
  info: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
