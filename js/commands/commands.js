
function onError(errorResponse) {
  alert("failed to recieve response");
}

console.log("setting up route module");
var app=angular.module('CommandModule', ['ngRoute','json-server-auth', 'json-server-users']);
console.log("route module set up");

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    console.log("configuring....");
    $routeProvider.
      when('/evalLogo/commands', {
        templateUrl: 'backoffice/backoffice.html',
        controller: 'CommandController', 
        controllerAs: 'vm'
      }).
      when('/evalLogo/edit/:commandName', {
        templateUrl: 'backoffice/editCommands.html',
        controller: 'EditController', 
        controllerAs: 'vm'
      }).
      when('/evalLogo/edit', {
        templateUrl: 'backoffice/editCommands.html',
        controller: 'EditController', 
        controllerAs: 'vm'
      }).
      when('/evalLogo/logo', {
        templateUrl: 'public/logoSimulator.html',
        controller: 'LogoController', 
        controllerAs: 'logo'
      }).
      when('/evalLogo', {
        templateUrl: 'login/login.html',
        controller: 'LoginController', 
        controllerAs: 'login'
      }).
      otherwise({
        redirectTo: '/evalLogo'
      });

      $locationProvider.html5Mode(true);
  }]);







