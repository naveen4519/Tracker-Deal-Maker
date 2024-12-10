const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Food schema and model
const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Food = mongoose.model('Food', foodSchema);

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a food item
router.post('/', async (req, res) => {
  try {
    const foodItem = new Food(req.body);
    await foodItem.save();
    res.json(foodItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;