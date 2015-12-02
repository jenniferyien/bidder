$(function(){
  // var socket = io();

  $("#submit").click(function(event){
    event.preventDefault();
    $.ajax({
      url: 'http://open.api.ebay.com/shopping?callname=FindPopularItems',
      method: 'GET',
      dataType: "jsonp",
      jsonp: "callbackname",
      crossDomain : true,
      data: {
          // appid: "",
          QueryKeywords : 'harry',
          MaxEntries:20,
          version:517,
          siteid:0,
          responseencoding: 'JSON'
      },
      success: function(data, status, xhr){
        console.log("data is", data);
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


  })



}); //closing function
