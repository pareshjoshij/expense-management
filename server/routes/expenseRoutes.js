const express = require('express');
const router = express.Router();
const { submitExpense } = require('../controllers/expenseController');

// @route   POST /api/expenses
// @desc    Submit a new expense claim
router.post('/', submitExpense);

module.exports = router;

