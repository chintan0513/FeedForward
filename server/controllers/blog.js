const Blog = require("../models/blog");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const image = req.file ? req.file.path : null; // Save the image path
    const newBlog = new Blog({
      title,
      content,
      author,
      tags: tags.split(","),
      image,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;
    const image = req.file ? req.file.path : null; // Save the new image path if uploaded
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, tags: tags.split(","), image },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
