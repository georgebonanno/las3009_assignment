var root="http://localhost:3000"
var commandsRestServiceUrl=root+"/commands";

function onError(errorResponse) {
  alert("failed to recieve response");
}

console.log("setting up route module");
var app=angular.module('CommandModule', ['ngRoute']);
console.log("route module set up");

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    console.log("configuring....");
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
      when('/v1', {
        templateUrl: 'login/login.html',
        controller: 'LoginController', 
        controllerAs: 'login'
      }).
      otherwise({
        redirectTo: '/v1'
      });

      $locationProvider.html5Mode(true);
  }]);







