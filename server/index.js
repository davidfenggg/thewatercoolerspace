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

io.on('connection', (socket) => {
   try{
      socket.on('login', async (msg) => {
         if (await db.checkOrganization(msg.companyId, msg.pin)) {
            socket.emit('login-response', 
                        {accepted:true, 
                        'org-name':(await db.getOrganizationName(msg.companyId)),
                        companyId:msg.companyId});
         } else {
            socket.emit('login-response', {accepted:false});
         }
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

