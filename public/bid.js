$(function(){
  // var socket = io();

  $("#submit").click(function(event){
    event.preventDefault();

    $.ajax({
      url: 'https://open.api.ebay.com/shopping?',
      method: 'GET',
      dataType: "json",
      data: {
          callname:'FindPopularItems',
          appid: ENV["EBAY_ID"],
          version:517,
          siteid:0,
          responseencoding:JSON
      },
      success: function(data, success, xhr){
        console.log("data is " +data);
      },
      error: function(xhr, data, error){
        console.log("error is "+error);
      }

    });
  });

}); //closing function
