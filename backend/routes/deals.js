const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Clothes schema and model
const dealsSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    actualPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    icon: { type: String, required: true },
});

const Deals = mongoose.model('Deals', dealsSchema);

// Get all clothing items
router.get('/', async (req, res) => {
    try {
        const deals = await Deals.find();
        // console.log(deals);
        res.json(deals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;