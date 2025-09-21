const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // The unique ID from Firebase Authentication
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  displayName: {
    type: String,
    trim: true,
  },

  // **NEW FIELD FOR THE IMAGE**
  // Stores the URL to the profile picture hosted on a storage service
  profileImageUrl: {
    type: String,
    default: '', // Provide a default empty string
  },
  
  // Application-specific user roles
  roles: {
    type: [String],
    enum: ['user', 'admin', 'editor'],
    default: ['user'],
  },

}, {
  // Automatically adds `createdAt` and `updatedAt` fields
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;