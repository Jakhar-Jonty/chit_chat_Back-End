const User = require('../model/userModel')
const bcrypt = require('bcrypt')

const sendWelcomeMessage = require('../config/welcomeMail')
require('dotenv').config()

// Register user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body);

    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
         //  Check if user already exists
         //check email
       const emailExists = await User.findOne({ email })
            if (emailExists) return res.status(400).json({ message: "Email already exists" })

        // check username
          const usernameExists = await User.findOne({ username })
            if (usernameExists) return res.status(400).json({ message: "Username already exists" })

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword})
        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
        // send user the welcome message using nodemailer
        sendWelcomeMessage(newUser);
    } catch (error) {
        console.error(error)
        // Handle Duplicate Key Errors Gracefully
        if (error.code === 11000) {
            const duplicateKeyError = Object.values(error.keyValue)[0]
            return res.status(400).json({ message: `Duplicate ${duplicateKeyError} value` })
        }
        // If other error occurs, return 500
        return res.status(500).json({ message: "Error registering user" })
    }
}
module.exports = registerUser