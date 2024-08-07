require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const volunteerRoutes = require('./routes/volunteerRoutes'); 

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
app.use('/api/volunteers', volunteerRoutes); // Use the routes for '/api/volunteers'
app.use('/api/event/list', eventRoutes);

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

// app.get('/reset/:token', (req, res) => {
//   const token = req.params.token;
//   // Add your logic to handle the token
//   // For example, check if the token is valid and render a reset form
//   res.send(`Reset token received: ${token}`);
// });

// app.use('/api/partner', partnerRoutes)
// app.use('/api/post', postRoutes)
// app.use('/api/item', itemRoutes)
// app.use('/api/order', orderRoutes)
// app.use('/api/notifications', notificationRoutes)
// app.use('/api/predict', predictRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, console.log("Server running on PORT: " + PORT));
