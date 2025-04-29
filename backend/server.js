const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const cartRoutes = require('../routes/cartRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
const orderRoutes = require('../routes/orderRoutes');
const uploadRoutes = require('../routes/uploadRoutes');
const subscriberRoutes = require('../routes/subscribeRoute');
const adminRoutes = require('../routes/adminRoutes');
const productAdminRoutes = require('../routes/ProductAdminRoutes');
const adminOrderRoutes = require('../routes/adminOrderRoutes');

const app = express(); //initialies express application
app.use(express.json());//to ensure server is able to work with json data

app.use(cors());//cors - cross origin requests

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();

app.get('/', (req, res) =>{
    res.send("welcome to FanCode API!");

});

//API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', subscriberRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', productAdminRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

// Only start the server if we're running directly (not being imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;