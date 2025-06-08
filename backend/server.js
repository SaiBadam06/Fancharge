const dotenv = require('dotenv');
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subscriberRoutes = require('./routes/subscribeRoute');
const adminRoutes = require('./routes/adminRoutes');
const productAdminRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const razorpayRoutes = require('./routes/razorpayRoutes');

// Initialize express
const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? ['https://fancharge.vercel.app', 'https://fancharge-yazq-gxie0d39g-sai-deekshith-badams-projects.vercel.app']
      : ['http://localhost:5173', 'http://localhost:3000'];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Additional security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
    ? 'https://fancharge-yazq-gxie0d39g-sai-deekshith-badams-projects.vercel.app'
    : 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date(),
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || '1.0.0'
    });
});

// API routes
const routes = [
  { path: '/api/users', router: userRoutes },
  { path: '/api/products', router: productRoutes },
  { path: '/api/cart', router: cartRoutes },
  { path: '/api/checkout', router: checkoutRoutes },
  { path: '/api/orders', router: orderRoutes },
  { path: '/api/upload', router: uploadRoutes },
  { path: '/api/subscribe', router: subscriberRoutes },
  { path: '/api/admin', router: adminRoutes },
  { path: '/api/admin/products', router: productAdminRoutes },
  { path: '/api/admin/orders', router: adminOrderRoutes },
  { path: '/api/payment', router: razorpayRoutes }
];

// Register all routes
routes.forEach(({ path, router }) => {
  app.use(path, router);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Only start the server if we're running directly (not being imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;
