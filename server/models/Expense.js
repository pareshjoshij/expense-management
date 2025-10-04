const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Please enter an expense amount'],
  },
  currency: {
    type: String,
    required: [true, 'Please specify the currency'],
    default: 'USD',
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Travel', 'Food', 'Supplies', 'Utilities', 'Other'], // Example categories
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please provide a description'],
  },
  expenseDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  // More complex approval fields will be added in a future phase.
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Expense', ExpenseSchema);

