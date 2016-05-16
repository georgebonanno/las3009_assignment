var root="http://localhost:3000"
var commandsRestServiceUrl=root+"/commands";

function onError(errorResponse) {
  alert("failed to recieve response");
}

var app=angular.module('CommandModule', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/commands', {
        templateUrl: 'backoffice/backoffice.html',
        controller: 'CommandController', 
        controllerAs: 'vm'
      }).
      when('/', {
        templateUrl: 'login/login.html'
      }).
      otherwise({
        redirectTo: '/commands'
      });
  }]);







