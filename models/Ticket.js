const mongoose = require('mongoose')
const User = require('../models/User')

const ticketSchema = mongoose.Schema({
    busId: { type: String, default: 'Bus01' },
    ticketNumber: { type: Number, min: 0, max: 40, required: true },
    date: { type: Date, default: Date.now(), required: true },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isBooked: { type: Boolean, default: true }
})

module.exports = mongoose.model('Ticket', ticketSchema);