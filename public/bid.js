$(function(){
  // var socket = io();

  $("#submit").click(function(event){
    event.preventDefault();

    $.ajax({
      url: "http://open.api.ebay.com/shopping?callname=FindPopularItems&responseencoding=XML&appid=Nonec795f-fb4b-4bcf-89a8-358c2f1d592&siteid=0&QueryKeywords=dog&version=713",
      method: 'GET',
      dataType: "script",
      data: {
          // callname:'FindPopularItems',
          // appid: "Nonec795f-fb4b-4bcf-89a8-358c2f1d592",
          // version:517,
          // siteid:0,
          responseencoding:NV
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
