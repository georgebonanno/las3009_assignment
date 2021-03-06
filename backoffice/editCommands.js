var app=angular.module('CommandModule');
app.controller('EditController', ['$scope', '$http', '$location','commandRetrieval','AuthenticationService',
				'$routeParams', function ($scope, $http,$location,commandRetrieval,AuthenticationService,
                                  $routeParams) {
  console.log("activating edit controller...");
  var editCtrl=this;
  if (!AuthenticationService.isLoggedIn()) {
     $location.path('/evalLogo');
  } 

	var command=$routeParams.commandName;

	if (command) {
		this.updateable=true;
		commandRetrieval.retrieveCommand(command)
			.then(function(response) {
				editCtrl.input=response.data;
			},function(errorResponse) {
				alert("failed to retrieve command "+command);
			});		
	} else {
		this.updateable=false;
		this.input={};
	}

	this.addCommand=function() {
      var promise = commandRetrieval.saveCommand(this.input,this.updateable,this);
      var that=this;
      promise && promise.then(
          function(response) {
            if (response != -1) {
              if (that.updateable) {
                //var commandPos=findCommand(commandToSave.id,that.commands);
                alert('successfully updated');
                //that.commands[commandPos]=commandToSave;
              } else {
                //that.commands.push(commandToSave);
                console.log(response);
                alert('command '+that.input.id+' successfully added');
              }
              that.input={};
              $location.path("/evalLogo/commands");
            }
          },
          function(errorResponse){
            console.log("error: "+errorResponse);
            alert('error while saving');
          }
        );
   };

}]);
