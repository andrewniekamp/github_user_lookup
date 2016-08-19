var getUserRepos = require('./../js/ghapi.js').repoModule;

$(function(){
  $("#search").submit(function(event) {
    event.preventDefault();
    var username = $("#user-input").val();
    getUserRepos(username);
  });
});
