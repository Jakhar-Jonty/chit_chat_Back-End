const User = require('../model/userModel')
const chat = require("../model/chatModel")

const getAllChats  = async(req,res)=>{
        const user = req.user 
        
   try {
        const allchat = await chat.find({ user: user._id }).populate('user','-password -chatsWith');
        // allchat = [{ "user": user.userId},{userId: user.userId}]
        console.log("allchat=>\n",allchat);
        
        if (allchat.length === 0) {
            return res.status(207).json({ message: "Search your friends and get connected" });
        }
        return res.status(200).json(allchat);
   } catch (error) {
        console.log(error);
        
   }
    
}

module.exports = getAllChats