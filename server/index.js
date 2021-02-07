var express = require('express');
var cors = require('cors')
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
   cors: {
     origin: "*",
     methods: ["GET", "POST"]
   }
 });
// var db = require('./db.js');

app.use(cors())

app.get('/', async function (req, res) {

   res.send('Hello World');
   console.log(await db.addOrganization('Carnegie Mellon University', '6666', 'cmu'));
})

io.on('connection', (socket) => {
   console.log('user connected');
   socket.on('login', (msg) => {
      console.log(msg)
   });
   socket.on('disconnect', () => {
      console.log('user disconnected')
   });
});

http.listen(6060, () => {
   console.log('listening on *:6060');
});

