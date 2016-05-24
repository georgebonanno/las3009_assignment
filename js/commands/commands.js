var root="http://localhost:3000"
var commandsRestServiceUrl=root+"/commands";

function onError(errorResponse) {
  alert("failed to recieve response");
}

var app=angular.module('CommandModule', ['ngRoute']);

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/v1/commands', {
        templateUrl: 'backoffice/backoffice.html',
        controller: 'CommandController', 
        controllerAs: 'vm'
      }).
      when('/v1/edit/:commandName', {
        templateUrl: 'backoffice/editCommands.html',
        controller: 'EditController', 
        controllerAs: 'vm'
      }).
      when('/v1/edit', {
        templateUrl: 'backoffice/editCommands.html',
        controller: 'EditController', 
        controllerAs: 'vm'
      }).
      when('/v1/logo', {
        templateUrl: 'public/logoSimulator.html',
        controller: 'LogoController', 
        controllerAs: 'logo'
      }).
      when('/v1/', {
        templateUrl: 'login/login.html'
      }).
      otherwise({
        redirectTo: '/v1/commands'
      });

      $locationProvider.html5Mode(true);
  }]);







