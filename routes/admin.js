const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

const TicketStatusHandler = require('../middleware/TicketStatusHandler');
const AdminValidation = require('../middleware/AdminValidation');

router.post('/create-empty-ticket', (req, res, next) => {
    const { ticketNumber } = req.body;

    const ApiKey = req.get('api_key');
    AdminValidation.ApiKeyValidation(ApiKey)
        .then((data) => {
            const ticket = new Ticket({ ticketNumber, user_id: null });
            return ticket.save();
        })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(400).json(err));
});

// Update the ticket status (open/close + adding user details)
router.put('/update/:ticket_id', (req, res, next) => {
    const { person, isBooked } = req.body;

    const ApiKey = req.get('api_key');
    AdminValidation.ApiKeyValidation(ApiKey)
        .then((data) => {
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
                .catch((err) => res.status(400).json(err.message));
        })
        .catch((err) => res.status(400).json(err));
});

// Additional API for admin to reset the server (opens up all the tickets)
router.put('/reset', (req, res, next) => {
    const ApiKey = req.get('api_key');
    AdminValidation.ApiKeyValidation(ApiKey)
        .then((data) => Ticket.find())
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
