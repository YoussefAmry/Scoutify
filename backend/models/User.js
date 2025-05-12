const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const experienceSchema = new mongoose.Schema({
  team: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const statsSchema = new mongoose.Schema({
  goals: {
    type: Number,
    default: 0,
  },
  assists: {
    type: Number,
    default: 0,
  },
  matches: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ['player', 'club', 'recruiter'],
    default: 'player',
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
  // Player specific fields
  position: {
    type: String,
    required: function() { return this.userType === 'player'; },
  },
  experience: [{
    type: experienceSchema,
    required: function() { return this.userType === 'player'; },
  }],
  stats: {
    type: statsSchema,
    default: () => ({}),
    required: function() { return this.userType === 'player'; },
  },
  skills: [{
    type: String,
    required: function() { return this.userType === 'player'; },
  }],
  achievements: [{
    title: String,
    date: Date,
    description: String,
  }],
  // Club specific fields
  clubName: {
    type: String,
    required: function() { return this.userType === 'club'; },
  },
  clubType: {
    type: String,
    required: function() { return this.userType === 'club'; },
  },
  // Recruiter specific fields
  organization: {
    type: String,
    required: function() { return this.userType === 'recruiter'; },
  },
  role: {
    type: String,
    required: function() { return this.userType === 'recruiter'; },
  },
  // Common fields
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
    maxLength: 500,
  },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Update the updatedAt timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User; 