const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const upload = require("../multer"); // Import multer configuration

// Create a new event with photo
router.post("/list", upload.single("photo"), async (req, res) => {
  try {
    const { title, address, date, info } = req.body;
    const newEvent = new Event({
      title,
      address,
      date,
      info,
      photo: req.file.path, // Save the file path to MongoDB
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all events
router.get("/list", async (req, res) => {
  // Changed the route path to /list to avoid conflict
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
