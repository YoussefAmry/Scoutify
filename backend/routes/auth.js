const express = require('express');
const { check } = require('express-validator');
const { register, login, getMe, updateProfile } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register validation
const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('userType', 'User type is required').notEmpty(),
  check('firstName', 'First name is required').notEmpty(),
  check('lastName', 'Last name is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
];

// Login validation
const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router; 