 // This file handles our connection to the MongoDB database.

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    // We use the MONGO_URI from our .env file to connect.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;

