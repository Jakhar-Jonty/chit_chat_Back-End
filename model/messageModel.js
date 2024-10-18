const mongoose = require('mongoose')

const messageModel  = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: true},
    chat:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Chat'
    }
})

const message = mongoose.model('Message', messageModel)

module.exports = message;