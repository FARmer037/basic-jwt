const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to db!")
);

// Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Server Up and running"));