const jwt =require('jsonwebtoken');
const User = require('../model/userModel')

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {

    if (req.path === '/login' || req.path === '/register') {
        return next();
    }
    // console.log(req.headers);
    
    const token = req.headers['authorization']
     console.log("token",token);
     
    if (!token) return res.status(401).json({ message: 'Token not provided' });
    jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
        if (err) {
            console.log("invalid token: ");
            
            return res.status(403).json({ message: 'Invalid token' });
        }
        
       if (user) {
        const isUser = await User.findOne({_id:user.userId}).select('-password -chatsWith');
        // console.log(isUser);

        req.user = isUser
       }
        
        // if (isUser===null) return res.status(403).json({ message: 'User not found' });
        console.log("Token verified");
        
        next();
    });
};

module.exports = verifyToken;