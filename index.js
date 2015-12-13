//linking express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//linking mongoDB
var mongo = require('mongodb');
var client = mongo.MongoClient;

var http = require('http').Server(app);
var io = require("socket.io")(http);

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//listing of currentUsers that is already within the database
var currentUser=[]
//mongo database connection
client.connect('mongodb://localhost:27017/bidder', function(error, db){
  if (error) {console.log("Coundn't connect to database")}
  //getting all users information
  app.get('/users', function(req, res){
    db.collection('user').find().toArray(function(error, users){
      res.send(users);
      users.forEach(function(user){
        currentUser.push(user)
      })
    })
  }); //get user list for index /show
  //posting new users into database
  app.post('/users/create', function(req, res){
    db.collection('user').insert(req.body, function(error){
      if (error) {res.send(error)}
    });
  }); //new and create

});

io.on('connection', function(socket){
  socket.on("login", function(user){
    var valid = false
    var currentValidUser = ''
    for(i=0; i < currentUser.length-1; i++){
      if(currentUser[i].email == user.username && currentUser[i].password == user.userpassword){
        currentValidUser = currentUser[i].name
        valid = true
      }
    }
    socket.emit('valid', {user: currentValidUser})
  }); //socket authorize
  socket.on('disconnect', function(){
      console.log('disconnected');
    });
}); //io


app.get('/', function(req, res){
  res.sendfile('index.html')
});

http.listen(3000, function(){
  console.log("listening on 3000");
});
