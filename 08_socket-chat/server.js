const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
// const http = require('http').Server(app);


app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(PORT, ()=> console.log(`listening port ${PORT}`))
