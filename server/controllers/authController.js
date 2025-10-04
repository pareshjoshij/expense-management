// This file contains the logic for handling authentication requests.

const User = require('../models/User');
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user and create a company
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists.' });
    }

    const company = await Company.create({
      name: companyName,
      defaultCurrency: 'USD',
    });

    const user = await User.create({
      name,
      email,
      password,
      role: 'Admin',
      companyId: company._id,
    });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      success: true,
      message: 'User registered and company created successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// @desc    Authenticate a user and get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          message: 'User logged in successfully.',
          token: token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            companyId: user.companyId, // This is the line that was added
          },
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Server error');
  }
};

