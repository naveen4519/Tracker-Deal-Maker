const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Groceries schema and model
const grocerySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  icon: { type: String, required: true },
});

const Grocery = mongoose.model('Grocery', grocerySchema);

// Get all grocery items
router.get('/', async (req, res) => {
  try {
    const groceryItems = await Grocery.find();
    res.json(groceryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a grocery item
router.post('/', async (req, res) => {
  try {
    const groceryItem = new Grocery(req.body);
    await groceryItem.save();
    res.json(groceryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;