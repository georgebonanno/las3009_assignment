var root="http://localhost:3000"

function onError(errorResponse) {
  alert("failed to recieve response");
}

var app=angular.module('CommandModule', []);
app.controller('CommandController', function ($scope, $http,commandRetrieval) {

   var loadCommands=function() {
      var promise=$http.get(root + '/commands');
      promise.then(function(response) {
          $scope.commands=response.data;
        },
        function(errorResponse) {
          alert("error occured during retrieval");
        }
      )
   };

   $scope.commands=loadCommands();

   $scope.input={};
   $scope.input.commandName='';
   $scope.input.commandDescription=''

   var saveCommand=function(commandToSave) {
      commandToSave.id=$scope.commands.length+1;
      var promise=$http.post(
          root + '/commands',
          {
            "id":commandToSave.id,
            "commandName": commandToSave.commandName,
            "description": commandToSave.description
          }
        );
      promise.then(
          function(response) {
            $scope.commands.push(commandToSave);
            $scope.input={};
            console.log(response);
            alert('successfully added');
          },
          function(errorResponse){
            console.log("error: "+errorResponse);
            alert('error while saving');
          }
        );
   };

  $scope.removeRow=function(commandToRemove) {
    $scope.selectedCommand=commandToRemove;
    var commandId=commandToRemove.id;
    console.log("to remove: command with id "+commandId);

    var removeSelectedCommand=function() {
      var commandPosition=$scope.commands.findIndex(function(current) {
        return current.id==commandToRemove.id;
      });
      console.log("position of command to remove: "+commandPosition);

      $scope.commands.splice(commandPosition,1);

      console.log("command with id "+commandId+" removed");
    };

    var deletePromise=$http.delete(root+"/commands/"+commandId);
    deletePromise.then(
      function(response) {
        removeSelectedCommand();
      },
      function(errorResponse) {
        onError(errorResponse);
      }
    );


  };

   $scope.addCommand=function() {
      saveCommand($scope.input);
   };
 });

app.service('commandRetrieval', function($http) {
   this.retrieveCommands= function() {
        return [
          {
            commandName: 'pu',
            description: 'puts the pen up'
          },
          {
            commandName: 'pd',
            description: 'puts the pen down'
          }
        ];
    };

    return this;
  });



