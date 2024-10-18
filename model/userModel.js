const mongoose = require('mongoose');

const userScema  = mongoose.Schema({
   username:{type: String, required: true,unique: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   picture: {type: String,default:"https://picsum.photos/200",},
   lastseen: {type: Date, required: true, default:Date.now()}


})

module.exports = mongoose.model('User', userScema);