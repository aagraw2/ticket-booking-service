var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = require('../models/User');
const Ticket = require('../models/Ticket')


// View Ticket Status 
router.get('/:ticket_id/get-status', function (req, res, next) {
  const { ticket_id } = req.params;
  Ticket.findById(ticket_id)
    .then(ticket => {
      const response = {
        ticketId: ticket._id,
        isBooked: ticket.isBooked
      }
      res.status(200).send(response)
    })
    .catch(err => console.log(err))
});

// View all closed tickets 
router.get('/tickets/closed', function (req, res, next) {
  Ticket.find({ isBooked: true })
    .then(tickets => {
      const response = {
        count: tickets.length,
        closedTickets: tickets
      }
      res.status(200).send(response)
    })
    .catch(err => res.status(400).json(err))
});

// View all open tickets 
router.get('/tickets/open', function (req, res, next) {
  Ticket.find({ isBooked: false })
    .then(tickets => {
      const response = {
        count: tickets.length,
        openTickets: tickets
      }
      res.status(200).send(response)
    })
    .catch(err => res.status(400).json(err))
});

// View Details of person owning the ticket. 
router.get('/:ticket_id/get-user', function (req, res, next) {
  const { ticket_id } = req.params;
  Ticket.findById(ticket_id)
    .then(ticket => {
      User.findById(ticket.user_id)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
});

module.exports = router;
