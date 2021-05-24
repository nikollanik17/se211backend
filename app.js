const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(function (req, res, next) {
	req.headers.origin = req.headers.origin || req.headers.host;
	next();
});

app.use(cors());

const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registration');
const teamRoutes = require('./routes/team');

app.use('/api/auth', authRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/teams', teamRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});
//test
mongoose
	.connect(
		process.env.MONGODB_URI ||
			'mongodb+srv://nikola:nikola123@cluster0.fupg3.mongodb.net/se211project?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((result) => {
		app.listen(PORT);
	})
	.catch((err) => console.log(err));
