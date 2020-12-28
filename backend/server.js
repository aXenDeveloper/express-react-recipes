const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import routers
const authRoute = require('./routers/auth');
const postRoute = require('./routers/posts');

// Config
const PORT = 8000;

// Connect DB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB!');
});

// Allow access API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.json());

// Routers
app.use('/account', authRoute);
app.use('/post', postRoute);

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}/`));