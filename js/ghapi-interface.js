var key = require('./../.env').apiKey;
var username = "andrewniekamp";
      $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
        console.log(response);
        $.each(response, function(index) {
          $("#repos").append("<li>" + this.name + "</li>");
        });
      }).fail(function(error){
        console.log(error.responseJSON.message);
      });
