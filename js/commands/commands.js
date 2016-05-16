var root="http://localhost:3000"
var commandsRestServiceUrl=root+"/commands";

function onError(errorResponse) {
  alert("failed to recieve response");
}

var app=angular.module('CommandModule', ['ngRoute']);
app.controller('CommandController', function ($scope, $http,commandRetrieval) {

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
 });

app.service('commandRetrieval', function($http) {
   var findCommand = function(commandId,commandArray) {
      var position=commandArray.findIndex(function(current) {
        return current.id==commandId;
      });
      return position;
   }

   var loadCommands=function(exports) {
      var promise=$http.get(root + '/commands');
      promise.then(function(response) {
          exports.commands=response.data;
        },
        function(errorResponse) {
          alert("error occured during retrieval");
        }
      )
   };

  var saveCommand=function(commandToSave,updateable,exports) {
      var saveUrl=commandsRestServiceUrl;
      var saveData= {
            "id": commandToSave.id,
            "commandDescription": commandToSave.commandDescription
          };
      var promise;
      if (updateable) {
        console.log("updating command details by raising put request");
        saveUrl+="/"+commandToSave.id;
        promise=$http.put(saveUrl,saveData);
      } else {
        console.log("updating command details by raising post request");
        var getUrl=commandsRestServiceUrl+"/"+commandToSave.id;
        var existCheckPromise=$http.get(getUrl);
        promise=existCheckPromise
                  .then(function(response) {
                      if (response.status == 404) {
                         return $http.post(saveUrl,saveData);
                      } else {
                        console.log("command with id "+commandToSave.id+" already exists");
                        alert("command already exists");
                        return -1;
                      }
                  }, function(errorResponse) {
                      if (errorResponse.status == 404) {
                         return $http.post(saveUrl,saveData);
                      } else {
                        console.log("error while saving: "+errorResponse.status);
                        window.alert("error while saving: "+errorResponse.status);
                        return -1;
                      }
                  });
      }
      promise && promise.then(
          function(response) {
            if (response != -1) {
              if (updateable) {
                var commandPos=findCommand(commandToSave.id,exports.commands);
                alert('successfully updated');
                exports.commands[commandPos]=commandToSave;
              } else {
                exports.commands.push(commandToSave);
                console.log(response);
                alert('successfully added');
              }
              exports.input={};
            }
          },
          function(errorResponse){
            console.log("error: "+errorResponse);
            alert('error while saving');
          }
        );
    }

    var removeCommand=function(commandList,commandId) {
      
      var removeSelectedCommand=function(commandId,commands) {
        var commandPosition=findCommand(commandId,commandList);
        console.log("position of command to remove: "+commandPosition);

        commands.splice(commandPosition,1); 

        console.log("command with id "+commandId+" removed");
      };

      var deletePromise=$http.delete(root+"/commands/"+commandId);
      deletePromise.then(
        function(response) {
          removeSelectedCommand(commandId,commandList);
        },
        function(errorResponse) {
          onError(errorResponse);
        }
      );


  };

    return {
        saveCommand: saveCommand,
        findCommand: findCommand,
        loadCommands: loadCommands,
        removeCommand: removeCommand
    };

  });



