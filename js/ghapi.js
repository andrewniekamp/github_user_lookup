var key = require('./../.env').apiKey;

var getUserRepos = function(username) {
  return $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
    //Clear for consecutive searches
    $("#user").html(" ");
    $("#repos").html(" ");

    console.log(response);
    if (response.length > 0) {
      var images = '';
      for (var i = 1; i <= 4; i++) {
        images += "<a href='" + response[0].owner.html_url + "'><img style='opacity:0." + (i * 24) + ";width:25%;' class='user-image' src='" + response[0].owner.avatar_url +"'/></a>";
      }

      $("#user").html("<h1>User: <a href='" + response[0].owner.html_url + "'>" + response[0].owner.login + "</a></h1>" + images);

      var description = " ";
      $("#repos").prepend("<h1>Repositories</h1>");
      $.each(response, function(index) {
        var created = moment(this.created_at).format('MMMM Do YYYY, h a');
        var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
        if (this.description !== null) {
          description = this.description;
        }
        $("#repos").append(
          "<div class='content col-sm-6'>" +
          "<h1><a href='" + this.url + "'> <span class='orange'>></span> " + this.name + "</a></h1>" +
          "<div class='col-xs-12'>" +
          "<p>Created: " + created + "</p>" +
          "<p>Updated: " + updated + "</p>" +
          "</div>" + //closing col-xs-12
          "<div class='col-xs-12'>" +
          "<p>" + description + "</p>" +
          "</div>" + //closing col-xs-12
          "</div>" //closing col-sm-6
        );
      });

    } else {
      $("#user").html("<h1 class='center'>No information found - please try again...</h1>");
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.repoModule = getUserRepos;
