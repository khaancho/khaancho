const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Ad } = require('../models/ad.model'); // Assuming you have an Ad model

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // Helpful for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Treat `username` as email during lookup
    const user = await User.findOne({ email: username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err); // Optional for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      joinedOn: user.createdAt?.toISOString().split('T')[0] || ''
    });
  } catch (err) {
    console.error('getCurrentUser error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyAds = async (req, res) => {
  try {
    const userId = req.user.id;
    const ads = await Ad.find({ userId });
    res.json(ads);
  } catch (error) {
    console.error('getMyAds error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};