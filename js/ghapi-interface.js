var key = require('./../.env').apiKey;
var username = "andrewniekamp";
      $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
        console.log(response);
      }).fail(function(error){
        console.log(error.responseJSON.message);
      });
