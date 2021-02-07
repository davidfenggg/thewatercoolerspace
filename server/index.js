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
   db.getGames(3)
   res.send('Hello World');
})

var userNames = {}
var gamesChosen = {}
var votesCast = {}

io.on('connection', (socket) => {
   try{
      var companyRoom = '';
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
            companyRoom = msg.companyId;
         } else {
            socket.emit('login-response', {accepted:false});
         }
      });
      socket.on('request-games', async (msg) => {
         var numPeople = io.sockets.adapter.rooms.get(companyRoom).size;
         var gamesPick = (await db.getGames(numPeople))
         io.to(companyRoom).emit('start-voting', {
            games:gamesPick
         })
         gamesChosen[companyRoom] = gamesPick;
         votesCast[companyRoom] = [0,0,0];
         setTimeout(async () => {
            var choice = 0;
            if (votesCast[companyRoom] === [0,0,0]) {
               var p1 = Math.floor(Math.random() * 3);
               choice = p1;
            } else {
               var sum = votesCast[companyRoom][0] + votesCast[companyRoom][1] + votesCast[companyRoom][2];
               var p1 = Math.floor(Math.random() * sum);
               if (p1 < votesCast[companyRoom][0]) {
                  choice = 0;
               } else if (p1 < votesCast[companyRoom][0] + votesCast[companyRoom][1]) {
                  choice = 1;
               } else {
                  choice = 2;
               }
            }
            io.to(companyRoom).emit('start-game', {game:gamesChosen[companyRoom][choice]});
            gamesChosen[companyRoom] = [];
            votesCast[companyRoom] = [0,0,0];
         },10000)
      });
      socket.on('vote', async (ind) => {
         votesCast[companyRoom][ind]++;
         console.log(votesCast[companyRoom])
      })
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

