const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Ticket = require('../models/Ticket');


// View Ticket Status
router.get('/:ticket_id/get-status', (req, res, next) => {
    const { ticket_id } = req.params;

    Ticket.findById(ticket_id)
        .then((ticket) => {
            if (ticket == null) {
                throw new Error('Ticket not found');
            }
            const response = {
                ticketId: ticket._id,
                isBooked: ticket.isBooked,
            };
            res.status(200).send(response);
        })
        .catch((err) => res.status(400).json({ err: err.message }));
});

// View all closed tickets
router.get('/tickets/closed', (req, res, next) => {
    Ticket.find({ isBooked: true })
        .then((tickets) => {
            const response = {
                count: tickets.length,
                closedTickets: tickets,
            };
            res.status(200).send(response);
        })
        .catch((err) => res.status(400).json(err));
});

// View all open tickets
router.get('/tickets/open', (req, res, next) => {
    Ticket.find({ isBooked: false })
        .then((tickets) => {
            const response = {
                count: tickets.length,
                openTickets: tickets,
            };
            res.status(200).send(response);
        })
        .catch((err) => res.status(400).json(err));
});

// View Details of person owning the ticket.
router.get('/:ticket_id/get-user', (req, res, next) => {
    const { ticket_id } = req.params;
    Ticket.findById(ticket_id)
        .then((ticket) => {
            if (ticket == null) {
                throw new Error('Ticket not found');
            }
            if (ticket.user_id == null) {
                throw new Error('User not found. Ticket is open.');
            }
            return User.findById(ticket.user_id);
        })
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(400).json({ err: err.message }));
});

module.exports = router;
