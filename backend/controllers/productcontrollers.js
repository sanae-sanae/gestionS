const Product = require('../models/product');

const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.file.path;

  try {
    const product = new Product({ name, description, price, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addProduct, getProducts };