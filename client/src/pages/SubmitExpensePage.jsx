import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitExpense } from '../services/api'; // Import the API function

const SubmitExpensePage = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food', // Default category
    description: '',
    expenseDate: new Date().toISOString().split('T')[0], // Default to today
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On component load, get the logged-in user's data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user is found, they shouldn't be on this page.
      // Redirect them to the login page.
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.amount || !formData.description || !formData.expenseDate) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const expenseData = {
        ...formData,
        submittedBy: user.id,
        companyId: user.companyId,
        currency: 'USD', // This is hardcoded for now
      };
      
      // Call the actual API function to submit the expense
      const response = await submitExpense(expenseData);

      if (response.success) {
        setSuccess('Expense submitted successfully!');
        
        // Clear the form for the next entry
        setFormData({
          amount: '',
          category: 'Food',
          description: '',
          expenseDate: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred while submitting the expense.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit a New Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
              step="0.01" // Allows decimal values
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              id="category"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Supplies</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700">Date of Expense</label>
            <input
              type="date"
              name="expenseDate"
              id="expenseDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.expenseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., Lunch meeting with a client"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitExpensePage;

