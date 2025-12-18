const express = require('express');
const router = express.Router();
const Ad = require('../models/ad.model'); // Assuming you have an Ad model defined

// GET all categories
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find({}, 'category'); // get only category field
    const categoriesSet = new Set(ads.map(ad => ad.category));
    const categories = Array.from(categoriesSet);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
