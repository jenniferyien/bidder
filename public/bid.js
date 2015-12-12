$(function(){
  //linking socket to emit information to node backend
  var socket = io();

  //single page app (initial hiding logout and search form)
  $("#searching").hide();
  $('#logging_out').hide();

  //ajax call to load backend array of users
  $.ajax({
    url: '/users',
    method: 'GET',
    success: function(data, status, xhr){
      console.log("success")
    },
    error: function(xhr, status, error){
      console.log("error is ", error);
    },
  }); //ajax

  //initialize search
  $("#submit").click(function(event){
    event.preventDefault();
    $("#bidItems").empty();
    var searchResult = $('#search').val();
    console.log(searchResult)
    //sending ajax call to ebay api
    $.ajax({
      url: 'http://open.api.ebay.com/shopping?callname=FindPopularItems',
      method: 'GET',
      dataType: "jsonp",
      jsonp: "callbackname",
      crossDomain : true,
      data: {
          // callname:'FindPopularItems',
          appid: "string",
          QueryKeywords : searchResult,
          MaxEntries: 20,
          // PageNumber: 20,
          version:517,
          siteid:0,
          responseencoding: 'JSON'

      },
      //grabbing success data and appending it to the dom
      success: function(data, success, xhr){
        // console.log(data);
        console.log(data.ItemArray.Item);
        var items = data.ItemArray.Item;
        items.forEach(function(item){
          // console.log(item.Title);
          var product = $("<li>");
          var itemInfo = $("<ul>")
          itemInfo.appendTo(product)
          var title = $("<li>")
          title.text(item.Title);
          title.appendTo(itemInfo);
          var price = $('<li>');
          price.text("$" + item.ConvertedCurrentPrice.Value)
          price.appendTo(itemInfo);
          var bidCount = $("<li>");
          bidCount.text("Bid Count " + item.BidCount);
          bidCount.appendTo(itemInfo);
          var endTime = $("<li>");
          endTime.text(item.EndTime);
          endTime.appendTo(itemInfo);
          product.appendTo($("#bidItems"));
        });
      },
      error: function(xhr, status, error){
        console.log("error is", error);
      }
    });
  });

  //register click
  $("#registering").click(function(event){
    event.preventDefault();
    //grabbing values from form
    var username = $("#name").val();
    var userEmail = $("#email").val();
    var userPassword = $("#password").val();


    //created hash for ajax call
    var hash = {name: username, email: userEmail, password: userPassword};
    //sending to route set for mongo database in backend
    $.ajax({
      url: '/users/create',
      method: 'POST',
      data: hash,
      success: function(data, status, xhr){
        console.log(data);
      },
      error: function(xhr, status, error){
        console.log("error is ", error);
      },
    });
    //clearing values for the form
    $("#name").val('');
    $("#email").val('');
    $("#password").val('');
    //allowing search after login
    $("#searching").show();
    $("#register").hide();
    $("#login").hide();
    //allowing logout option after login
    $('#logging_out').show();
    //indicating who is logged in
    $("#loggedIn").text(username + " is logged in.");
  });

  //login click grabbing user email and password
  $("#logging_in").click(function(event){
    event.preventDefault();
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    //login email and password is passed to the backend for check
    socket.emit('login', {username: email, userpassword: password})
  })
  //if user email and password is valid, name would display and search bar would reveal
  socket.on('valid', function(user){
    $('#loggedIn').text(user.user + " is logged in.")
    $("#searching").show();
    $("#register").hide();
    $("#login").hide();
    $('#logging_out').show();
  });
  //if use clicks logout, there will be an emit to disconnect user from server
  $('#logging_out').click(function(event){
    event.preventDefault();
    socket.emit('disconnect');
    $("#searching").hide();
    $("#register").show();
    $("#login").show();
    $('#logging_out').hide();
    $('#loggedIn').text('');
  })


}); //closing function
