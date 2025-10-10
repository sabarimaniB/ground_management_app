const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const auth = async (req, res, next) => {
    try {
        // Get token from cookies instead of headers
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }

        // Verify the JWT
        const decoded = jwt.verify(token, 'secret token');
        const user = await User.findById(decoded.user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user; // Attach user info to the request
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = auth;
