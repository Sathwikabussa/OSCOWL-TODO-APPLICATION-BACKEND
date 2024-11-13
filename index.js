const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

// Allow requests from http://localhost:3004 (your frontend URL)
app.use(cors({
    origin: 'https://bussasathwikatodoapplication.netlify.app',
    credentials: true // if your frontend needs cookies or authorization headers
  }));
  
// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Server setup
const PORT = process.env.PORT || 8030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
