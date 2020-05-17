const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const redis = require('redis');
const Credentials = require('../models/Credentials');

const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
client.on('error', (error) => {
    console.error(error);
});

router.post('/', (req, res, next) => {
    const { username, password } = req.body;
    const secret = process.env.SECRET;
    const refreshTokenSecret = process.env.RT_SECRET;
    Credentials.find({ username, password })
        .then((response) => {
            if (response.length > 0) {
                const authToken = jwt.sign({ username }, secret, { expiresIn: '1h' });
                const refreshToken = jwt.sign({ username }, refreshTokenSecret, { expiresIn: '24h' });
                const output = {
                    username,
                    message: 'Authentication successful',
                    token: authToken,
                    refreshToken,
                };
                client.set(refreshToken, authToken, redis.print);
                return output;
            }
            throw new Error('Authentication failed. Please check username or password');
        })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(400).json({ err: err.message }));
});

router.post('/refresh-token', (req, res) => {
    const { username, refreshToken } = req.body;
    const secret = process.env.SECRET;

    if (refreshToken) {
        client.exists(refreshToken, (error, ok) => {
            if (ok === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token invalid',
                });
            }
            jwt.verify(refreshToken, process.env.RT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Refresh token expired',
                    });
                }
                const authToken = jwt.sign({ username }, secret, { expiresIn: '1h' });
                client.set(refreshToken, authToken, redis.print);
                res.status(200).json({
                    username,
                    message: 'Authentication token refreshed',
                    token: authToken,
                    refreshToken,
                });
            });
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid Request. Please check refresh token',
        });
    }
});

module.exports = router;
