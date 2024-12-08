const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Movie schema and model
const movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
