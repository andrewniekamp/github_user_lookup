var key = require('./../.env').apiKey;

var getUserRepos = function(username) {
  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response){
    console.log(response);

    $("#user").html(
      "<h1><a href='" + response[0].owner.html_url + "'>" + response[0].owner.login + "</a></h1>" +
      "<a href='" + response[0].owner.html_url + "'><img id='user-image' src='" + response[0].owner.avatar_url +"'/></a>"
    );

    var description = " ";
    $.each(response, function(index) {
      var created = moment(this.created_at).format('MMMM Do YYYY, h a');
      var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
      if (this.description != null) {
        description = this.description;
      }
      $("#repos").append(
        "<div class='content col-sm-6'>" +
          "<h1><a href='" + this.url + "'>" + this.name + "</a></h1>" +
          "<div class='col-xs-12'>" +
            "<p>Created: " + created + "</p>" +
            "<p>Updated: " + updated + "</p>" +
          "</div>" + //closing col-xs-12
          "<div class='col-xs-12'>" +
            "<p>" + description + "</p>" +
          "</div>" + //closing col-xs-12
        "</div>" + //closing col-sm-6
        "<div class='clearfix visible-sm'></div>"
      );
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.repoModule = getUserRepos;
