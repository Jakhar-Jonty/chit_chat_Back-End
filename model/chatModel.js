const mongoose = require('mongoose')

const chatModel  = mongoose.Schema({
    chatName:{type:String, required:true},
    isGroupChat:{type:Boolean, required:false},
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
})
const chat = mongoose.model('Chat', chatModel)

module.exports = chat;