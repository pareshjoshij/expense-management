// This is the main entry point for our backend application.

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the request body

// --- API Routes ---
// Any request to /api/auth will be handled by our authRoutes file.
app.use('/api/auth', require('./routes/authRoutes'));


// Define a simple root route for testing
app.get('/', (req, res) => {
  res.send('Expense Management API is running...');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
