// This file defines the schema for our 'Company' collection in MongoDB.

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true,
  },
  defaultCurrency: {
    type: String,
    required: [true, 'Please set a default currency'],
    default: 'USD', // Default currency, can be updated later.
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Company', companySchema);
