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
    //db mongo collection of all users, this is already created in the mongo db
    db.collection('user').find().toArray(function(error, users){
      res.send(users);
      users.forEach(function(user){
        currentUser.push(user)
      })
    })
  }); //get user list for index /show
  //posting new users into database
  app.post('/users/create', function(req, res){
    //db mongo collection user inserting a hash with all information needed into the mongo db
    db.collection('user').insert(req.body, function(error){
      if (error) {res.send(error)}
    });
  }); //new and create

});
//grabbing information from client side
io.on('connection', function(socket){
  //login check
  socket.on("login", function(user){
    //automatic false
    var valid = false
    //no current user
    var currentValidUser = ''
    //loops through all users
    for(i=0; i < currentUser.length-1; i++){
      //check to see if username and password matches what exists already in our database
      if(currentUser[i].email == user.username && currentUser[i].password == user.userpassword){
        currentValidUser = currentUser[i].name
        //if currect we change the validity to true
        valid = true
      }
    }
    //if user is valid
    socket.emit('valid', {user: currentValidUser})
  }); //socket authorize
  //if user signs out of account
  socket.on('disconnect', function(){
      console.log('disconnected');
    });
}); //io

//showing index file
app.get('/', function(req, res){
  res.sendfile('index.html')
});

//listening for port localhost (this will need to change if we push live (ex.heroku))
http.listen(3000, function(){
  console.log("listening on 3000");
});
