const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password, userType, firstName, lastName, ...otherFields } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      userType,
      firstName,
      lastName,
      ...otherFields,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete user profile
// @route   POST /api/auth/complete-profile
// @access  Private
exports.completeProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      userType,
      firstName,
      lastName,
      age,
      location,
      position,
      experience,
      stats,
      skills,
      clubName,
      clubType,
      organization,
      role,
      bio,
      socialLinks,
    } = req.body;

    // Create update object with common fields
    const updateData = {
      userType,
      firstName,
      lastName,
      age,
      location,
      bio,
      socialLinks,
      profileCompleted: true,
    };

    // Add type-specific fields
    if (userType === 'player') {
      updateData.position = position;
      updateData.experience = experience;
      updateData.stats = stats;
      updateData.skills = skills;
    } else if (userType === 'club') {
      updateData.clubName = clubName;
      updateData.clubType = clubType;
    } else if (userType === 'recruiter') {
      updateData.organization = organization;
      updateData.role = role;
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields based on user type
    const updatableFields = [
      'firstName',
      'lastName',
      'age',
      'location',
      'bio',
      'socialLinks',
      'profileImage',
    ];

    // Add type-specific fields
    if (user.userType === 'player') {
      updatableFields.push('position', 'experience', 'stats', 'skills');
    } else if (user.userType === 'club') {
      updatableFields.push('clubName', 'clubType');
    } else if (user.userType === 'recruiter') {
      updatableFields.push('organization', 'role');
    }

    // Update fields
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}; 