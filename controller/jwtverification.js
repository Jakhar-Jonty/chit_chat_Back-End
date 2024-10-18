const jwt =require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {

    if (req.path === '/login' || req.path === '/register') {
        return next();
    }
    // console.log(req.headers);
    
    const token = req.headers['authorization']
     console.log("this is token",token);
     
    if (!token) return res.status(401).json({ message: 'Token not provided' });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            
            return res.status(403).json({ message: 'Invalid token' });}
        req.user = user;
        console.log("Token verified");
        next();
    });
};

module.exports = verifyToken;