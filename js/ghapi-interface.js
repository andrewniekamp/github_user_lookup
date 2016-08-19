var username = "andrewniekamp";
var getUserRepos = require('./../js/ghapi.js').repoModule;

$(function(){
  getUserRepos(username);
});
