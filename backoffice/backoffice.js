var app=angular.module('CommandModule');
app.controller('CommandController', ['$scope', '$http', 'commandRetrieval', function ($scope, $http,commandRetrieval) {

   commandRetrieval.loadCommands($scope);
   $scope.showNewCommand=false;

   var clearInput=function() {
     $scope.input={};
     $scope.input.commandName='';
     $scope.input.commandDescription=''
   };

   clearInput();

   $scope.newCommand=function() {
      $scope.updateable=false;
      $scope.showNewCommand=true;
      clearInput();
   }

   $scope.toCommandList=function() {
     commandRetrieval.loadCommands($scope);
     $scope.showNewCommand=false;
   }

   $scope.selectCommand=function(commandToSelect) {
      $scope.input={};
      $scope.input.id=commandToSelect.id;
      $scope.input.commandDescription=commandToSelect.commandDescription;
      $scope.updateable=true;
      $scope.showNewCommand=true;
   }



  $scope.removeRow=function(commandToRemove) {
    var commandId=commandToRemove.id;
    console.log("to remove: command with id "+commandId);

    commandRetrieval.removeCommand($scope.commands,commandId);

  };

   $scope.addCommand=function() {
      commandRetrieval.saveCommand($scope.input,$scope.updateable,$scope);
   };
 }]);