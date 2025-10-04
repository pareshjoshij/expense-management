// This file defines the API endpoints related to authentication.

const express = require('express');
const { registerUser } = require('../controllers/authController');
const router = express.Router();

// Route for user registration.
// When a POST request is made to /api/auth/register, the registerUser function is called.
router.post('/register', registerUser);

module.exports = router;
