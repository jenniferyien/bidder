$(function(){
  var socket = io();
  $("#searching").hide();
  $('#logging_out').hide();

  $.ajax({
    url: '/users',
    method: 'GET',
    success: function(data, status, xhr){
      console.log("success")
    },
    error: function(xhr, status, error){
      console.log("error is ", error);
    },
  });

  $("#submit").click(function(event){
    event.preventDefault();
    $("#bidItems").empty();
    var searchResult = $('#search').val();
    console.log(searchResult)
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

  $("#registering").click(function(event){
    event.preventDefault();
    var username = $("#name").val();
    var userEmail = $("#email").val();
    var userPassword = $("#password").val();


    //created hash for ajax call
    var hash = {name: username, email: userEmail, password: userPassword};
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
    $("#name").val('');
    $("#email").val('');
    $("#password").val('');
    $("#searching").show();
    $("#register").hide();
    $("#login").hide();
    $('#logging_out').show();
    $("#loggedIn").text(username + " is logged in.");
  });

  $("#logging_in").click(function(event){
    event.preventDefault();
    var email = $("#user_email").val();
    var password = $("#user_password").val();
    socket.emit('login', {username: email, userpassword: password})
  })

  socket.on('valid', function(user){
    $('#loggedIn').text(user.user + " is logged in.")
    $("#searching").show();
    $("#register").hide();
    $("#login").hide();
    $('#logging_out').show();
  });

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
