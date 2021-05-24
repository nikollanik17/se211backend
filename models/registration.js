const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema(
	{
		expires: {
			type: Date,
			required: true,
		},
	}
);

module.exports = mongoose.model('Registration', registrationSchema);
