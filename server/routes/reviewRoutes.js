const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Protected route for creating a review
router.post('/', protect, createReview);

module.exports = router;