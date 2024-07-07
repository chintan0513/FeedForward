const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// POST route to add multiple new products
router.post("/add-multiple-products", async (req, res) => {
  const products = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .send("Invalid input, expected an array of products.");
  }

  try {
    const newProducts = await Product.insertMany(products);
    res
      .status(201)
      .json({ message: "Products added successfully!", products: newProducts });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE route to delete a product by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const { name, description, imageUrl } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl },
      { new: true }
    );
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
