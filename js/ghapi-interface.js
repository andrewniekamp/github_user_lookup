var key = require('./../.env').apiKey;
var username = "andrewniekamp";
      $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
        console.log(response);
        $("#user").html(
          "<h1>" + response[0].owner.login + "</h1>" +
          "<img id='user-image' src='" + response[0].owner.avatar_url +"'/>"
        );
        $.each(response, function(index) {
          $("#repos").append("<li>" + this.name + "</li>");
        });
      }).fail(function(error){
        console.log(error.responseJSON.message);
      });
