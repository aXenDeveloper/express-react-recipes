import * as express from 'express';
import { connect } from 'mongoose';
import accountRoute from './routers/auth';
import recipesRoute from './routers/recipes';

const app = express();
const dotenv = require('dotenv').config();

// Config
const PORT = process.env.PORT ?? 8000;

// Connect DB
connect(
	process.env.DB_CONNECT ?? '',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	() => {
		console.log('Connected to DB!');
	}
);

app.use(express.static('public'));

// Allow access API
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

app.use(express.json());

// Routers
app.use('/account', accountRoute);
app.use('/recipes', recipesRoute);

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}/`));
