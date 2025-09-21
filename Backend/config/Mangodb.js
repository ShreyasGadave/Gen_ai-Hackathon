// Import the Mongoose library
const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL.
// Replace 'your_database_name' with the actual name of your database.
// It's best practice to store this in an environment variable (e.g., process.env.MONGO_URI)
const MONGO_URI = process.env.MONGODB_URI;

// Function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');
  } catch (error) {
    // Log any errors that occur during connection
    console.error('MongoDB connection failed:', error.message);
    
    // Exit the process with a failure code if connection fails
    process.exit(1);
  }
};

// Export the function so it can be used in other parts of your application
module.exports = connectDB;
