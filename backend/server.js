const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routers
const authRoute = require('./routers/auth');

// Config
const PORT = 8000;
dotenv.config();

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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

// Routers
app.use('/account', authRoute);

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}/`));