const express = require("express");
const multer = require("multer");
const Product = require("../models/product"); // Modèle produit
const verifyToken = require("../middleware/authMiddleware"); // Middleware JWT
const router = express.Router();

// Configuration de Multer pour l'upload des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Route : Ajouter un produit
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.file.filename;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      image,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
});

// Route : Récupérer tous les produits
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});

// Route : Supprimer un produit
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

// Route : Mettre à jour un produit
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true }
    );

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});

module.exports = router;