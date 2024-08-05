require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const url = process.env.ATLAS_URI;

const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const productRoutes = require("./routes/product");
const blogRoutes = require("./routes/blog");

// const partnerRoutes = require('./routes/partner')
// const postRoutes = require('./routes/post')
// const itemRoutes = require('./routes/item')
// const orderRoutes = require('./routes/order')
// const notificationRoutes = require('./routes/notification')
// const predictRoutes = require('./routes/predict')

app.use(cors());
app.use(express.json()); // Body parser for JSON requests
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

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

// app.use('/api/partner', partnerRoutes)
// app.use('/api/post', postRoutes)
// app.use('/api/item', itemRoutes)
// app.use('/api/order', orderRoutes)
// app.use('/api/notifications', notificationRoutes)
// app.use('/api/predict', predictRoutes)

app.listen(PORT, console.log("Server running on PORT: " + PORT));
