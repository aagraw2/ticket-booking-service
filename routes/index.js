var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const User = require('../models/user');

router.post('/book-ticket', function (req, res, next) {

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age
  })
  user.save()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    });
  res.status(200).json(req);

});

router.post('/unbook-ticket', function (req, res, next) {

});

router.post('/view-status', function (req, res, next) {

});

router.post('/view-open-tickets', function (req, res, next) {

});

router.post('/view-closed-tickets', function (req, res, next) {

});

router.post('/reset-server', function (req, res, next) {

});

module.exports = router;
