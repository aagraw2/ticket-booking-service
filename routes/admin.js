const express = require('express');

const router = express.Router();

const Ticket = require('../models/Ticket');

const TicketStatusHandler = require('../middleware/TicketStatusHandler');
const TokenValidation = require('../middleware/TokenValidation');

router.post('/create-empty-ticket', TokenValidation.validateToken, (req, res, next) => {
    const { ticketNumber } = req.body;

    const ticket = new Ticket({ ticketNumber, user_id: null });
    ticket.save()
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(400).json({ err: err.message }));
});

// Update the ticket status (open/close + adding user details)
router.put('/update/:ticket_id', TokenValidation.validateToken, (req, res, next) => {
    const { person, isBooked } = req.body;

    const { ticket_id } = req.params;

    Ticket.findById(ticket_id)
        .then((ticket) => {
            if (ticket == null) {
                throw new Error('Error: Ticket not found');
            }
            return ticket;
        })
        .then((ticket) => {
            if (!isBooked) {
                return TicketStatusHandler.setTicketOpen(ticket);
            }
            if (isBooked && person != null) {
                return TicketStatusHandler.setTicketClosed(ticket, person);
            }
            return 'invalid Request';
        })
        .then((response) => res.status(200).json({ message: 'Ticket updated successfully' }))
        .catch((err) => res.status(400).json({ err: err.message }));
});

// Additional API for admin to reset the server (opens up all the tickets)
router.put('/reset', TokenValidation.validateToken, (req, res, next) => {
    Ticket.find()
        .then((tickets) => new Promise((resolve, reject) => {
            const allPromiseTickets = tickets.map(
                (ticket) => TicketStatusHandler.setTicketOpen(ticket),
            );
            Promise.all(allPromiseTickets).then((allResolvedTickets) => {
                resolve(allResolvedTickets);
            }).catch((error) => {
                reject(error);
            });
        }))
        .then((response) => {
            res.status(200).json({ message: 'Reset operation successful' });
        })
        .catch((err) => {
            res.status(400).json({ err: err.message });
        });
});

module.exports = router;
