const mongoose = require('mongoose')

const chatModel  = mongoose.Schema({
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    
})
const chat = mongoose.model('Chat', chatModel)

module.exports = chat;