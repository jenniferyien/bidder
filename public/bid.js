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
          // callname:'FindPopularItems',
          appid: "Nonec795f-fb4b-4bcf-89a8-358c2f1d592",
          QueryKeywords : "Harry Potter",
          MaxEntries: 20,
          // PageNumber: 20,
          version:517,
          siteid:0,
          responseencoding: 'JSON'

      },
      success: function(data, success, xhr){
        // console.log(data);
        // console.log(data.ItemArray.Item);
        var items = data.ItemArray.Item;
        items.forEach(function(item){
          // console.log(item.Title);
          var product = $("<li>");
          product.text(item.Title);
          product.appendTo($("#bidItems"));
        });
      },
      error: function(xhr, data, error){
        console.log("error is", error);
      }

    });
  });

}); //closing function
