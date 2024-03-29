const express = require('express');
const cors = require('cors')
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(cors({
    origin: ["http://localhost:8080","http://192.168.0.107:8080"]
}));
app.get('/', (req, res) => {
    res.send("Server is running");
});
const io = socketIO(server,{
    cors: {
        origin: ["http://localhost:8080","http://192.168.0.107:8080"],
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    console.log("new user ", socket.id)
    socket.on('send-message', (message,room) => {
        if(room==="") 
        socket.broadcast.emit('receive-message', message)
        else
        socket.broadcast.to(room).emit('receive-message', message)
    })
    socket.on('join-room', (room) => {
        socket.join(room);
    })
    socket.on("disconnecting", () => {
        console.log(socket.rooms); // the Set contains at least the socket ID
      });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});