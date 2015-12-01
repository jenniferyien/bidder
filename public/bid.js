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
      success: function(data, success, xhr){
        console.log("data is", data);
      },
      error: function(xhr, data, error){
        console.log("error is", error);
      }

    });
  });

}); //closing function
