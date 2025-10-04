const Expense = require('../models/Expense');

// @desc    Submit a new expense claim
// @route   POST /api/expenses
// @access  Private (Authentication middleware will be added later)
exports.submitExpense = async (req, res) => {
  try {
    const { amount, currency, category, description, expenseDate } = req.body;
    
    // NOTE: In a real, secure application, we would extract the user and company IDs
    // from the JWT token after verifying it with middleware.
    // For this development phase, we will pass them in the request body for testing.
    const { submittedBy, companyId } = req.body; 

    if (!submittedBy || !companyId || !amount || !category || !description || !expenseDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required expense fields.' });
    }

    const newExpense = await Expense.create({
      submittedBy,
      companyId,
      amount,
      currency,
      category,
      description,
      expenseDate,
    });

    res.status(201).json({
      success: true,
      message: 'Expense submitted successfully.',
      data: newExpense,
    });
  } catch (error) {
    console.error('Expense Submission Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

