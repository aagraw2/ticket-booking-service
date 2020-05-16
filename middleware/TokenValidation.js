const jwt = require('jsonwebtoken');

module.exports = {
    validateToken(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers.authorization;

        if (token) {
            if (token.startsWith('Bearer')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid token. Access denied.',
                    });
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Authentication Token required.',
            });
        }
    },
};
