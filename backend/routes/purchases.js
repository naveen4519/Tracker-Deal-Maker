const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Purchase Schema
const purchaseSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

// Create a new purchase
router.post('/', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a purchase
router.delete('/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
