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
var db = require('./db.js');

app.use(cors())

app.get('/', async function (req, res) {

   res.send('Hello World');
   console.log(await db.addOrganization('Carnegie Mellon University', '6666', 'cmu'));
})

var userNames = {}

io.on('connection', (socket) => {
   try{
      socket.on('login', async (msg) => {
         if (await db.checkOrganization(msg.companyId, msg.pin)) {
            socket.emit('login-response', 
                        {accepted:true, 
                        'org-name':(await db.getOrganizationName(msg.companyId)),
                        companyId:msg.companyId});
            waiting = true;
            socket.join(msg.companyId);
            userNames[socket.id] = msg.name;
            var listOfSockets = io.sockets.adapter.rooms.get(msg.companyId);
            var listOfNames = []
            listOfSockets.forEach((id) => {
               listOfNames.push(userNames[id]);
            });
            io.to(msg.companyId).emit('room-status', {
               names:listOfNames
            });
         } else {
            socket.emit('login-response', {accepted:false});
         }
      });
      socket.on('disconnecting', () => {
         var rooms = socket.rooms;
         rooms.forEach((room) => {
            var listOfSockets = io.sockets.adapter.rooms.get(room);
            listOfSockets.delete(socket.id);
            var listOfNames = []
            listOfSockets.forEach((id) => {
               listOfNames.push(userNames[id]);
            });
            io.to(room).emit('room-status', {
               names:listOfNames
            });
         });
      });
      socket.on('disconnect', () => {
         console.log('user disconnected')
      });
      socket.on('create-organization', async (msg) => {
         await db.addOrganization(msg.name, msg.pin, msg.organizationId);
      });
   }
   catch (err){
      console.log(err);
   }
});

http.listen(6060, () => {
   console.log('listening on *:6060');
});

