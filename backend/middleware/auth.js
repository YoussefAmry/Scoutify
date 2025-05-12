const admin = require('../config/firebase-admin');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Get user from database
      let user = await User.findOne({ firebaseUid: decodedToken.uid });
      
      // If user doesn't exist in our database yet, create a basic profile
      if (!user) {
        user = await User.create({
          firebaseUid: decodedToken.uid,
          email: decodedToken.email,
          emailVerified: decodedToken.email_verified,
        });
      }
      
      req.user = user;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check user type
exports.authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: `User type ${req.user.userType} is not authorized to access this route`,
      });
    }
    next();
  };
}; 