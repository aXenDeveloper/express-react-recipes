const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Config
const PORT = 8000;

// Connect DB
mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log('Connected to DB!');
	}
);

// Allow access API
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

app.use(express.json());

// Routers
app.use('/account', require('./routers/auth'));
app.use('/recipes', require('./routers/recipes'));

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}/`));
