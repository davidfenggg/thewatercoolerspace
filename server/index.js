var express = require('express');
const { Pool, Client } = require('pg')
var app = express();
const pool = new Pool()


app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(6060, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})