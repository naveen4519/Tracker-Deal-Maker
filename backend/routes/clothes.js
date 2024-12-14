const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Clothes schema and model
const clothesSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  icon: { type: String, required: true },
});

const Clothes = mongoose.model('Clothes', clothesSchema);

// Get all clothing items
router.get('/', async (req, res) => {
  try {
    const clothingItems = await Clothes.find();
    res.json(clothingItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a clothing item
router.post('/', async (req, res) => {
  try {
    const clothingItem = new Clothes(req.body);
    await clothingItem.save();
    res.json(clothingItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;