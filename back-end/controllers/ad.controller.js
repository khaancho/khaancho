const Ad = require('../models/ad.model');

// POST /api/ads
exports.createAd = async (req, res) => {
  try {
    const ad = new Ad({
      ...req.body,
      userId: req.user.id  // ⬅️ Attach the logged-in user ID
    });
    await ad.save();
    res.status(201).json({ message: 'Ad created successfully', ad });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/ads?category=electronics

exports.getAds = async (req, res) => {
  try {
    const keyword = req.query.q;
    let filter = {};

    if (keyword && keyword.trim() !== '') {
      const regex = new RegExp(keyword.trim(), 'i'); // case-insensitive search
      filter = {
        $or: [
          { title: regex },
          { category: regex },
          { description: regex }
        ]
      };
    }

    const ads = await Ad.find(filter)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/ads/my-ads

exports.getAdsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const ads = await Ad.find({ userId }).populate('userId', 'name email');

    res.json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
