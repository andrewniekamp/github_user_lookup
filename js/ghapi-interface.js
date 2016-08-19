var getUserRepos = require('./../js/ghapi.js').repoModule;

$(function(){
  $("#search").submit(function(event) {
    event.preventDefault();
    var username = $("#user-input").val();
    $("#body-container").fadeOut("fast", function() {
      //Use a promise to prevent fading conflicts
      getUserRepos(username).then(function() {
        $("#body-container").fadeIn("fast");
      });
    });
  });
});
