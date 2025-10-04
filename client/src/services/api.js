import axios from 'axios';

// The Vite proxy will handle forwarding this to the correct backend server.
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Registers a new user.
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error or server is not responding.');
  }
};

/**
 * Logs in a user.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error or server is not responding.');
  }
};

/**
 * Submits a new expense claim.
 * @param {object} expenseData - The details of the expense.
 * @returns {Promise<object>} The server response.
 */
export const submitExpense = async (expenseData) => {
  try {
    // In a real app, we would also send the auth token here
    // const token = localStorage.getItem('token');
    // const config = { headers: { 'Authorization': `Bearer ${token}` } };
    const response = await apiClient.post('/expenses', expenseData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Expense submission failed');
    }
    throw new Error('Network error or server is not responding.');
  }
};

