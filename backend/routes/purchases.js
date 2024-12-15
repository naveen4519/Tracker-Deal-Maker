const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Define Purchase Schema
const purchaseSchema = mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Create the Purchase model
const Purchase = mongoose.model('Purchase', purchaseSchema);

// Get all purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find(); // Retrieve all purchases from MongoDB
        res.json(purchases); // Send all purchases in response
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch purchases', details: err.message });
    }
});

// Save a new purchase
router.post('/', async (req, res) => {
    try {
        const { category, name, price } = req.body;
        const newPurchase = new Purchase({
            category,
            name,
            price,
            timestamp: new Date(),
        });

        const savedPurchase = await newPurchase.save(); // Save the new purchase to MongoDB
        res.status(201).json(savedPurchase); // Send the saved purchase back in the response
    } catch (err) {
        res.status(400).json({ error: 'Failed to save purchase', details: err.message });
    }
});

module.exports = router;
