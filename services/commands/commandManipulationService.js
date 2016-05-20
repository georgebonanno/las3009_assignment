app.service('commandRetrieval', function($http) {
   var findCommand = function(commandId,commandArray) {
      var position=commandArray.findIndex(function(current) {
        return current.id==commandId;
      });
      return position;
   }

   var retrieveCommand=function(command) {
      var getCommandUrl=commandsRestServiceUrl+"/"+command;
      return $http.get(getCommandUrl);
   };

   var loadCommands=function() {
      var promise=$http.get(root + '/commands');

      return promise;
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
      return promise;
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
        removeCommand: removeCommand,
        retrieveCommand: retrieveCommand
    };

  });