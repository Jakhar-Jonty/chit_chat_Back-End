const User = require("../model/userModel");

const searchUser = async (req, res) => {
    // console.log(req.body);
    
    const { searchQuery } = req.body;
    // console.log(searchQuery);
    if (searchQuery) {
        try {
            const users = await User.find({ username: { $regex: `^${searchQuery}`, $options: 'i' } }).select('-password');
            if (users.length > 0) {
                // const usernames = users.map((user) => {user.username, user.picture}).join(' ');
                console.log(users);
                
                return res.status(200).json(users);
            } else {
                return res.status(404).json({ message: "No users found" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An error occurred while searching for users" });
        }
    }
    return res.status(404).json({ message: "User not found" });
}

module.exports = searchUser;