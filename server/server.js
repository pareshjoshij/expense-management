const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import cors

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// --- Define Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes')); // Add this line for expenses

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

