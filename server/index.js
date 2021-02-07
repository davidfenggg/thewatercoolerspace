var express = require('express');
var db = require('./db.js');
var app = express();

app.get('/', async function (req, res) {

   res.send('Hello World');
   console.log(await db.addOrganization('Carnegie Mellon University', '6666', 'cmu'));
})

var server = app.listen(6060, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

