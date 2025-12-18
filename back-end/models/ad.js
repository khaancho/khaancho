// models/Ad.js

import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  location: {
    city: String,
    area: String
  },
  images: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String }
  },
  postedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'sold', 'pending', 'archived'], default: 'active' },
  views: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [String],
  slug: { type: String, unique: true },
  expiryDate: { type: Date }
});

export default mongoose.model('Ad', AdSchema);
