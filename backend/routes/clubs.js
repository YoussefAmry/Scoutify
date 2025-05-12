const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/clubs
// @desc    Get all clubs
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find({ userType: 'club' }).select('-password');
    res.json({ success: true, clubs: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/clubs/:id
// @desc    Get club by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const club = await User.findOne({ 
      _id: req.params.id,
      userType: 'club'
    }).select('-password');
    
    if (!club) {
      return res.status(404).json({ success: false, message: 'Club not found' });
    }
    res.json({ success: true, club });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 