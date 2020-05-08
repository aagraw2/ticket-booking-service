const mongoose = require('mongoose');
const User = require('./User');

const ticketSchema = mongoose.Schema({
	ticketNumber: {
		type: Number,
		min: [1, 'Ticket Number should be between 1 to 40'],
		max: [40, 'Ticket Number should be between 1 to 40'],
		required: [true, 'Ticket Number cannot be empty'],
		unique: [true, 'Ticket Number should be unique'],
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	isBooked: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Ticket', ticketSchema);
