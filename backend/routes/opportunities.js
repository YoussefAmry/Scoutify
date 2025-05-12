const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Opportunity = require('../models/Opportunity');

// @route   GET /api/opportunities
// @desc    Get all opportunities
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('club', 'clubName location')
      .sort('-createdAt');
    res.json({ success: true, opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/opportunities
// @desc    Create a new opportunity
// @access  Private (Club only)
router.post('/', protect, authorize('club'), async (req, res) => {
  try {
    const opportunity = await Opportunity.create({
      ...req.body,
      club: req.user.id,
    });

    res.status(201).json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/opportunities/:id
// @desc    Get opportunity by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('club', 'clubName location')
      .populate('applications.user', 'firstName lastName');

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/opportunities/:id
// @desc    Update opportunity
// @access  Private (Club only, owner)
router.put('/:id', protect, authorize('club'), async (req, res) => {
  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Make sure user owns the opportunity
    if (opportunity.club.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/opportunities/:id/apply
// @desc    Apply for an opportunity
// @access  Private (Player only)
router.post('/:id/apply', protect, authorize('player'), async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Check if already applied
    if (opportunity.applications.some(app => app.user.toString() === req.user.id)) {
      return res.status(400).json({ success: false, message: 'Already applied' });
    }

    opportunity.applications.push({ user: req.user.id });
    await opportunity.save();

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 