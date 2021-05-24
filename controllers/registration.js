// const { validationResult } = require('express-validator');
const Registration = require('../models/registration');

exports.getTime = (req, res, next) => {
	Registration.findOne()
		.then((result) => {
			res.status(200).json({
                expires: result.expires
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.changeTime = (req, res, next) => {
	const { expires } = req.body;

	Registration.findOneAndUpdate({},{expires:expires})
		.then(() => {
            Registration.findOne()
            .then((result) => {
                res.status(200).json({
                    expires: result.expires
                });
            })
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

