const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'volunteer'],
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: false,
  },
  requirements: [{
    type: String,
  }],
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open',
  },
  applications: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp on save
opportunitySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity; 