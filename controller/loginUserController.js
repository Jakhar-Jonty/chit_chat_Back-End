const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }
    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }



        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' } 
        );
        
        // Send the token in the response
        res.status(200).json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }

}

module.exports = loginUser;