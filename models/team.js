const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		leader: {
			type: String,
			required: true,
		},
		phoneNumber:{
			type:String,
			required:false,
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
