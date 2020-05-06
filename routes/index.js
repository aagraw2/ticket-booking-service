var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = require('../models/User');
const Ticket = require('../models/Ticket')

router.post('/create-ticket', function (req, res, next) {

  const user = new User(req.body.person)

  const ticket = new Ticket({
    ticketNumber: req.body.ticketNumber
  })

  //Todo: User Validation
  //Todo: Ticket Validation

  user.save()
    .then(data => {
      ticket.person = user._id;
      ticket.save()
        .then(data => res.status(200).json(data))
        .catch(err => {
          User.findOneAndDelete({ _id: user._id })
            .then(data => res.status(400))
            .catch(err => res.status(400).json(err))
        })
    })
    .catch(err => res.status(400).json(err))
});

// Update the ticket status (open/close + adding user details) 
router.put('/update-ticket', function (req, res, next) {

});

// View Ticket Status 
router.get('/get-status/:ticket_id', function (req, res, next) {
  const { ticket_id } = req.params;
  Ticket.findById(ticket_id)
    .then(data => res.status(200).send(data.isBooked))
    .catch(err => console.log(err))
});

// View all closed tickets 
router.get('/tickets/closed-tickets', function (req, res, next) {
  Ticket.find({ isBooked: true })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).json(err))
});

// View all open tickets 
router.get('/tickets/open-tickets', function (req, res, next) {
  Ticket.find({ isBooked: false })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).json(err))
});

// View Details of person owning the ticket. 
router.get('/get-user/:ticket_id', function (req, res, next) {
  const { ticket_id } = req.params;
  Ticket.findById(ticket_id)
    .then(data => {
      User.findById(data.person)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
});

// Additional API for admin to reset the server (opens up all the tickets) 
router.post('/reset', function (req, res, next) {
  const { adminId, password } = req.body;
  if (adminId == null || password == null) {
    res.status(400).json({ message: "Unauthenticated access denied" })
  }

  //Todo: Validate Username and password

  Ticket.find({})
    .then(data => data.map(
      // Change ticket status to open 
    ))
    .then(data => res.status(200).json({ message: "Reset operation successful" }))
    .catch(err => res.status(400).json(err))
});

module.exports = router;
