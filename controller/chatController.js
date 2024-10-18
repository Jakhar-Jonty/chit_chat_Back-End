const User = require('../model/userModel')


const chatWithUser = async(req,res)=>{
    console.log(req.params)
    const {user} = req.params

    if(!user){
        return res.status(400).json({ message: 'Invalid user' });
    }
    
    const resUser = await User.findOne({ username: user }).select('-password');
    console.log(resUser._id);
    

   
}

module.exports = chatWithUser;