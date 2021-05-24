const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// const getIdFromAuth = (req) => {
// 	let authorization = req.headers.authorization.split(' ')[1];
// 	let decoded;

// 	try {
// 		decoded = jwt.verify(authorization, 'nikola');
// 	} catch (e) {
// 		return res.status(401).send('Unathorized');
// 	}

// 	return decoded.id;
// };

exports.login = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	let loadedUser;

	User.findOne({ username: username })
		.then((user) => {
			if (!user) {
				const error = new Error('Pogresno korisnicko ime!');
				error.statusCode = 404;

				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Pogresna sifra!');
				error.statusCode = 401;
				throw error;
			}
			const token = jwt.sign({ id: loadedUser._id }, 'nikola', {
				// expiresIn: "1h",
			});
			res.status(200).json({
				token: token,
				data: {
					id: loadedUser._id,
					username: loadedUser.username,
				},
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.register = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Validacija nije uspesna!');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}

	const username = req.body.username;
	const password = req.body.password;

	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			const user = new User({
				username,
				password: hashedPassword,
			});
			return user.save();
		})
		.then((result) => {
			res.status(200).json({
				message: 'Korisnik registrovan!',
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
