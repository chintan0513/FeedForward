const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const EventRegistration = require("../models/eventregistration");
const nodemailer = require("nodemailer");
const upload = require("../multer");

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
    console.error("Error fetching event details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { eventId, eventDate, userEmail } = req.body;

  try {
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is already registered for this event
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userEmail,
    });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ error: "User already registered for this event" });
    }

    // Create new event registration
    const newRegistration = new EventRegistration({
      eventId,
      eventDate,
      userEmail,
    });

    // Save registration
    await newRegistration.save();

    // Optionally, send confirmation email here
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/check-registration", async (req, res) => {
  const { eventId, userEmail } = req.query;

  try {
    const existingRegistration = await EventRegistration.findOne({
      eventId,
      userEmail,
    });

    if (existingRegistration) {
      return res.status(200).json({ registered: true });
    } else {
      return res.status(200).json({ registered: false });
    }
  } catch (error) {
    console.error("Error checking registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/sendNotification", async (req, res) => {
  const { userEmail, eventTitle } = req.body;

  try {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chintantripathi1310@gmail.com", // Replace with your email address
        pass: "Chintan@1310", // Replace with your email password or use environment variables
      },
    });

    // Send email with defined transport object
    let info = await transporter.sendMail({
      from: '"Event Registration" chintantripathi1310@gmail.com', // Sender address
      to: userEmail, // List of receivers
      subject: `Registration Confirmation for ${eventTitle}`, // Subject line
      html: `<p>Dear Participant,</p><p>You have successfully registered for the event "${eventTitle}".</p>`,
    });

    console.log("Email sent: %s", info.messageId);
    res.status(200).send("Email notification sent successfully.");
  } catch (error) {
    console.error("Error sending email notification:", error);
    res.status(500).json({ error: "Failed to send email notification." });
  }
});

router.get("/registrations", async (req, res) => {
  const { userEmail } = req.query; // Get the user's email from the query

  try {
    // Fetch registrations for the user and filter for past events
    const currentDate = new Date();
    const registrations = await EventRegistration.find({
      userEmail,
      eventDate: { $lt: currentDate }, // Filter for past events
    }).populate("eventId"); // Populate eventId to get event details

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
