const mongoose = require('mongoose')

const messageModel  = mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: {type: String, required: true},
    chat:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chat'
    },
    createdAt: { type: Date, default: Date.now }
})

const messages = mongoose.model('Messages', messageModel)

module.exports = messages;