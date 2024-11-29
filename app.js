const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const clothingRoutes = require('./routes/clothingRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://onlinecommerce:onlinecommerce@commerce.rmewx.mongodb.net/?retryWrites=true&w=majority&appName=Commerce', // Your MongoDB URI
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/clothing', clothingRoutes);

app.use((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //allowing our api to run on any browser
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE'); //allowing anyone to use HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //allowing only content-type and authorization headers
})

// Default route for testing
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Export the app for Vercel
module.exports = app;
