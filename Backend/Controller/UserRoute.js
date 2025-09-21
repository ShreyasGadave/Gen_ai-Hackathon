const express = require("express");
const User = require("../Model/CreateUser");

const router = express.Router();

// Controller function
const findOrCreateUser = async (req, res) => {
  try {
    const { firebaseUid, email, ...profileData } = req.body;

    // Validate required fields
    if (!firebaseUid || !email) {
      return res.status(400).json({ message: 'firebaseUid and email are required fields.' });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ firebaseUid });

    let savedUser;
    if (existingUser) {
      savedUser = existingUser;
    } else {
      savedUser = await User.create({ firebaseUid, email, ...profileData });
    }

    res.status(200).json(savedUser);
  } catch (error) {
    console.error('Error in findOrCreateUser controller:', error.message);
    res.status(500).json({ message: 'Server error while processing user data.' });
  }
};

router.post("/", findOrCreateUser);

module.exports = router;
