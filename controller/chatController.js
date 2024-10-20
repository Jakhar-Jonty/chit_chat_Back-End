const User = require('../model/userModel')
const chat = require('../model/chatModel')
const messages = require('../model/messageModel')

const chatWithUser = async(req,res)=>{
    console.log(req.params)
    const receiverUser  = req.user
    // console.log(senderUser);
    const {user} = req.params
    

    if(!user){
        return res.status(400).json({ message: 'Invalid user' });
    }
    try {
        const senderUser = await User.findOne({username:user}).select('-password -chatsWith')
        console.log("Reciever Details=>\n ",receiverUser);
        console.log("Sender Details=>\n ",senderUser );
        if(!senderUser){
            return res.status(404).json({ message: 'User not found' });
        }
        let chatHistory = await chat.findOne({
            $or: [
                { user: [senderUser._id, receiverUser._id] },
                { user: [receiverUser._id, senderUser._id] }
            ]
        })

        // console.log("chat history: => ", chatHistory);
        
        if(!chatHistory){
           // send message to client that start conversation sending heloo
        return response.status(203).json({message:"Say hello And start conversation"})
        }

        const allMessages = await messages.find({chat : chatHistory._id})
        // console.log("All Messages: => ", allMessages);
        return res.status(200).json({"allMessages":allMessages,"receiverUser":receiverUser,"senderUser":senderUser});
     
    }  catch (error) {
        console.log("Chat controller error =>\n", error);
        return res.status(500).json({ message: 'An error occurred while processing the chat' });
    }
    

}

module.exports = chatWithUser;