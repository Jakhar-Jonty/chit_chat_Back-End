const mongoose = require('mongoose');

// Connect to MongoDB

const connectdb = ()=>{
    mongoose.connect('mongodb://localhost:27017/chitchat', {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('MongoDB Connected...')).catch((err) =>{
    console.error(err.message);
    process.exit(1);
   })
}

module.exports = connectdb