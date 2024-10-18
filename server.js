const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const http = require('http')
const connectdb = require('./config/dbconnection')
const app = express()
app.use(express.json())
const {Server} =require('socket.io')
const registerUser = require('./controller/registerUserController')
const loginUser = require('./controller/loginUserController')
const searchUser = require('./controller/searchUserController')
const verifyToken  = require('./controller/jwtverification')
const chatWithUser = require('./controller/chatController')
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH"],
    } 
 
})
app.use(cors())
app.use(express.json())
connectdb();

// Middleware to authenticate JWT token
app.use(verifyToken)





// Socket.io events
io.on("connection",(socket)=>{
    console.log("connection established",);

    socket.on("message",(msg)=>{
        console.log("message received",msg);
        io.emit("message",msg);
    })
    
    
    
    socket.on('disconnect',()=>{
        console.log("client disconnected");
    })
})




// API endpoints
app.post("/register",registerUser)
app.post("/login",loginUser)
app.post("/searchuser",searchUser)

app.get('/chat/:user',chatWithUser)

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

