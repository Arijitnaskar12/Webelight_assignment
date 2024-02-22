const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({
            status: 400,
            message: "JWT is not provided! Please log in"
        });
    }

    let isVerified;
    try {
        isVerified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        req.locals = isVerified;
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return res.status(400).json({
            status: 400,
            message: "Invalid or expired JWT token! Please log in again"
        });
    }
};

module.exports = { isAuth };
