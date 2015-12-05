$(function(){
  // var socket = io();

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
      error: function(xhr, data, error){
        console.log("error is", error);
      }

    });
  });

}); //closing function
