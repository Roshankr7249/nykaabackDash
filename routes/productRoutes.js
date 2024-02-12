const express = require('express');
const { authenticateToken } = require('../config/middleware');
const Product = require('../models/product');

const router = express.Router();

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// Add
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { name, picture, description, gender, category, price } = req.body;

    const newProduct = new Product({
      name,
      picture,
      description,
      gender,
      category,
      price,
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { name, picture, description, gender, category, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          picture,
          description,
          gender,
          category,
          price,
        },
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Delete 
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(202).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
