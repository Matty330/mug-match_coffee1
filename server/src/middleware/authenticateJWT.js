const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') ?.split(' ')[1];

    if(!token) {
        return res.status(403).json({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'jwt_secret');
        req.user = decoded
        next();
    } catch (err) {
        console.error('JWT authentication error', err);
        return res.status(400).json({error: 'Invalid token' });
    }
};

module.exports = authenticateJWT;