var key = require('./../.env').apiKey;
var username = "andrewniekamp";
      $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
        console.log(response);
        $("#user").html(
          "<h1>" + response[0].owner.login + "</h1>" +
          "<img id='user-image' src='" + response[0].owner.avatar_url +"'/>"
        );
        $.each(response, function(index) {
          $("#repos").append(
            "<div class='row'>" +
              "<h1><a href='" + this.url + "'>" + this.name + "</a></h1>" +
              "<div class='col-xs-12'>" +
                "<li>" + this.created_at + "</li>" +
              "</div>" + //closing col-xs-12
            "</div>" //closing row
          );
        });
      }).fail(function(error){
        console.log(error.responseJSON.message);
      });
