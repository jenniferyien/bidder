var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongodb');
var client = mongo.MongoClient;

var http = require('http').Server(app);
var io = require("socket.io")(http);

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile('index.html')
});

http.listen(3000, function(){
  console.log("listening on 3000");
});
