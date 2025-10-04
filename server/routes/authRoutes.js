// This file defines the API routes for authentication.

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Import both functions

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser); // Add the new login route

module.exports = router;

