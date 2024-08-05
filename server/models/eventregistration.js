const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventregistration = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  eventDate: Date,
  userEmail: String,
});

module.exports = mongoose.model("EventRegistration", eventregistration);
