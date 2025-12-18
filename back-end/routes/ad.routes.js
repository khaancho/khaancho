const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const auth = require('../middleware/auth.js');


// Correct usage
router.post('/', auth, adController.createAd);
router.get('/', adController.getAds);
router.get('/me', auth, adController.getAdsByUser);  // new route
router.get('/my-ads', auth, adController.getAdsByUser); // ✅ Add this line

module.exports = router;
