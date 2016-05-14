var app=angular.module('CommandModule', []);
app.controller('CommandController', function ($scope) {
  alert('in here');
   $scope.commands= [];
 });
