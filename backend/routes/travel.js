const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Travel schema and model
const travelSchema = mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Travel = mongoose.model('Travel', travelSchema);

// Get all travel entries
router.get('/', async (req, res) => {
  try {
    const travelEntries = await Travel.find();
    res.json(travelEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a travel entry
router.post('/', async (req, res) => {
  try {
    const travelEntry = new Travel(req.body);
    await travelEntry.save();
    res.json(travelEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
