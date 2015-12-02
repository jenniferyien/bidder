var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongodb');
var client = mongo.MongoClient;

var http = require('http').Server(app);
var io = require("socket.io")(http);

// app.use(bodyParser.urlencoded({extend: false}));
// app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//mongo
client.connect('mongodb://localhost:27017/bidder', function(error, db){
  if (error) {console.log("Coundn't connect to database")}
  app.get('/users', function(req, res){
    db.collection('user').find().toArray(function(error, users){
      res.send(users);
    })
  }); //get user list for index /show

  app.post('/users/create', function(req, res){
    db.collection('user').insert(req.body, function(error){
      if (error) {res.send(error)}
    });
  }); //new and create

});



app.get('/', function(req, res){
  res.sendfile('index.html')
});

http.listen(3000, function(){
  console.log("listening on 3000");
});
