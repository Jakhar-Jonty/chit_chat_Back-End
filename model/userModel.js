const mongoose = require('mongoose');

const userScema  = mongoose.Schema({
   username:{type: String,trim:true, required: true,unique: true},
   email: {type: String,trim:true, required: true, unique: true},
   password: {type: String, required: true},
   picture: {type: String,default:"https://picsum.photos/200",},
   chatsWith:[
      {type: mongoose.Schema.Types.ObjectId, ref: 'chat'}
   ]


})

module.exports = mongoose.model('User', userScema);