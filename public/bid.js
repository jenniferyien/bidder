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
<<<<<<< HEAD
          // callname:'FindPopularItems',
          appid: "string",
          QueryKeywords : "Harry Potter Children's Books",
          MaxEntries: 20,
          // PageNumber: 20,
          version:517,
          siteid:0,
          responseencoding: 'JSON'

      },
      success: function(data, success, xhr){
<<<<<<< HEAD
        console.log("data is " +data);
        console.log(data)
      },
      error: function(xhr, data, error){
        console.log("error is", error);
      }

    });
  });

}); //closing function
