require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const url = process.env.ATLAS_URI;

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const productRoutes = require("./routes/product");
const blogRoutes = require("./routes/blog");
const donationRoutes = require("./routes/donations");

app.use(cors());
app.use(express.json()); // Body parser for JSON requests
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("MongoDB error: " + err);
  });

app.get("/", (_, res) => {
  res.json({
    name: "Server",
    project: "FeedForward",
  });
});

app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/product", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/donate", donationRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, console.log("Server running on PORT: " + PORT));
