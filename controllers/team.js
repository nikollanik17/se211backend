const { validationResult } = require('express-validator');
const Team = require('../models/team');

exports.getTeams = (req, res, next) => {
	Team.find()
		.then((result) => {
			res.status(200).json({
				data: result,
				totalCount: result.length,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.findTeams = (req, res, next) => {
	const { pageNumber, pageSize, sortField, sortOrder } = req.body;

	let sliceFrom = (pageNumber - 1) * pageSize;

	Team.find()
		.sort([[sortField, sortOrder === 'asc' ? 1 : -1]])
		.skip(sliceFrom)
		.limit(pageSize)
		.then((result) => {
			Team.count().then((total) => {
				res.status(200).json({
					data: result,
					totalCount: total,
				});
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.postTeam = (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('Validacija neuspesna!');
		error.statusCode = 422;
		throw error;
	}

	const team = req.body;

	const TeamObj = new Team({
		...team,
	});

	TeamObj.save().then((result) => {
		res.status(201).json({
			message: 'Tim uspesno kreiran!',
		});
	});
};

exports.deleteTeam = (req, res, next) => {
	const id = req.params.id;

	Team.findByIdAndDelete(id)
		.then((result) => {
			if (!result) {
				const error = new Error('Tim nije pronadjen');
				error.statusCode = 404;
				throw error;
			}
			Team.find()
				.then((result) => {
					res.status(200).json({
						data: result,
						totalCount: result.length,
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
