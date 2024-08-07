const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String, // Assuming author is a string.
    required: true,
  },
  tags: {
    type: [String], // Array of tags
  },
  image: {
    type: String, // URL or path of the image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
