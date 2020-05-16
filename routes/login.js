const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const Credentials = require('../models/Credentials');


router.get('/', (req, res, next) => {
    const { username, password } = req.body;
    const secret = process.env.SECRET;
    Credentials.find({ username, password })
        .then((response) => {
            if (response.length > 0) {
                const authToken = jwt.sign({ username }, secret, { expiresIn: '1h' });
                return {
                    success: true,
                    message: 'Authentication successful!',
                    token: authToken,
                };
            }
            throw new Error('Authentication failed. Please check username or password');
        })
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({ err: err.message }));
});

module.exports = router;
