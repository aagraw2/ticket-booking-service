var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = require('../models/User');
const Ticket = require('../models/Ticket')

const TicketStatusHandler = require('../middleware/TicketStatusHandler')

router.post('/create-empty-ticket', function (req, res, next) {

    const { adminId, password, ticketNumber } = req.body;
    // if (adminId == null || password == null) {
    //     res.status(400).json({ message: "Unauthenticated access denied" })
    // }

    //Todo: Validate Admin Id and password

    const ticket = new Ticket({ ticketNumber: ticketNumber, user_id: null })

    ticket.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err))
});

// Update the ticket status (open/close + adding user details) 
router.put('/update/:ticker_id', function (req, res, next) {

    const { adminId, password, person, isBooked } = req.body;

    // if (adminId == null || password == null) {
    //     res.status(400).json({ message: "Unauthenticated access denied" })
    // }

    //Todo: Validate Admin Id and password

    const { ticket_id } = req.params;

    if (!isBooked) {
        Ticket.findById(ticket_id)
            .then(ticket => {
                TicketStatusHandler.setTicketOpen(ticket);
            })
            .catch(err => res.status(400).json(err))
    }
    if (isBooked && person != null) {
        Ticket.findById(ticket_id)
            .then(ticket => {
                TicketStatusHandler.setTicketClosed(ticket, person);
            })
            .catch()
    }
});

// Additional API for admin to reset the server (opens up all the tickets) 
router.post('/reset', function (req, res, next) {
    const { adminId, password } = req.body;
    // if (adminId == null || password == null) {
    //     res.status(400).json({ message: "Unauthenticated access denied" })
    // }

    //Todo: Validate Admin Id and password

    Ticket.find()
        .then(tickets => {
            return new Promise((resolve, reject) => {
                const allPromiseTickets = tickets.map(
                    ticket => TicketStatusHandler.setTicketOpen(ticket));
                Promise.all(allPromiseTickets).then(allResolvedTickets => {
                    resolve(allResolvedTickets);
                }).catch((error) => {
                    reject(error);
                })
            })
        })
        .then(data => {
            console.log("data: ", data)
            res.status(200).json({ message: "Reset operation successful" })
        })
        .catch(err => {
            console.log('error: ', err.message)
            res.status(400).json({ err: err.message })
        })
});

module.exports = router;
