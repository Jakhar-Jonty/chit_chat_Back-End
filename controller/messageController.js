const messages = require('../model/messageModel')
const User = require("../model/userModel")
const chat = require('../model/chatModel')

const messageStore = async (req, res) => {
    const { message } = (req.body);
    const reciever = (req.user);
    const sendername = (req.params);

    // console.log("this is message data=>",message,reciever,sendername);
    
    try {
        const senderUser = await User.findOne({ username: sendername.user }).select('-password -chatsWith')
        const receiverId = reciever._id
        // console.log(senderUser);
        
        const senderId = senderUser._id;

        let chatHistory = await chat.findOne({
            $or: [
                { user: [senderId, receiverId] },
                { user: [receiverId, senderId] }
            ]
        })
        if (!chatHistory) {
            newchat = new chat({
                user: [senderId, receiverId]
            })
           chatHistory = await newchat.save()
        }

        const  chatId = chatHistory._id




        try {
            const newMessage =new messages({
                senderId, receiverId, message,chat:chatId
            }
            )
            await newMessage.save()
            res.status(201).json(newMessage)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server Error" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" })
    }





}

//    const {sender,receiver,content} =  (req.body)

// try {
//     const pushChat = await chat.findOneAndUpdate({$or: [{users: sender, users: receiver}, {users: receiver, users: sender}]}, {$push: {messages: content}}, {new: true, upsert: true})

//     console.log(pushChat);

// } catch (error) {
//     console.log(error);

// }


module.exports = messageStore