const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`))
app.get('/', (req,res) => {
  res.send(200);
});

io.on('connection', (socket)=>{
  console.log('a user connected');
  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });
  socket.on('new message', (message) => {
    console.log(message);
  });
  socket.on('user login', (username)=> {
    console.log(`socket ${username}`);
    socket.broadcast.emit('new user', username);
  });
  socket.on('chat message', (msg, username)=> {
    io.emit('chat message', msg, username);
  });
});

http.listen(PORT, ()=>{
  console.log(`listening on ${PORT}`);
})
