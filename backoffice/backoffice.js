var app=angular.module('CommandModule');
app.controller('CommandController', ['$scope', '$http', 'commandRetrieval',
             '$location','AuthenticationService',
  
 function ($scope, $http,commandRetrieval,$location,AuthenticationService) {

   var that=this;
   if (!AuthenticationService.isLoggedIn()) {
     $location.path('/v1');
   } else {
      var loggedUserDetails=AuthenticationService.getCurrentUser();

      if (loggedUserDetails) {
        that.loggedUser=loggedUserDetails.username;
      } else {
        console.log("warning: information retrieved from logged user");
      }
   }

    that.logOut = function() {
      AuthenticationService.Logout().then(function() {
        $location.path("/v1/");
      },
      function() {
        alert("failed to logout");
        //attempt to redirect to login page in case user
        //want to log in with other user
        $location.path("/v1/");
      });
   }



   commandRetrieval.loadCommands()
        .then(function(response) {
           that.commands=response.data;
        },
        function(errorResponse) {
          alert("error occured during retrieval");
        }
      );
   this.showNewCommand=false;

   var clearInput=function() {
     this.input={};
     this.input.commandName='';
     this.input.commandDescription=''
   };

   clearInput();

   this.newCommand=function() {
      this.updateable=false;
      this.showNewCommand=true;
      clearInput();
   }

   this.toCommandList=function() {
     commandRetrieval.loadCommands().then(
        function(data) {
          this.commands=data;
        }
    );
     this.showNewCommand=false;
   }

   this.selectCommand=function(commandToSelect) {
      this.input={};
      this.input.id=commandToSelect.id;
      this.input.commandDescription=commandToSelect.commandDescription;
      this.updateable=true;
      this.showNewCommand=true;
   }



   this.removeRow=function(commandToRemove) {
    var commandId=commandToRemove.id;
    console.log("to remove: command with id "+commandId);

    commandRetrieval.removeCommand(this.commands,commandId);

   };

   this.addCommand=function() {
      var promise = commandRetrieval.saveCommand(this.input,this.updateable,this);
      var that=this;
      promise && promise.then(
          function(response) {
            if (response != -1) {
              if (that.updateable) {
                var commandPos=findCommand(commandToSave.id,that.commands);
                alert('successfully updated');
                that.commands[commandPos]=commandToSave;
               } else {
                 that.commands.push(commandToSave);
                 console.log(response);
                 alert('successfully added');
               }
               that.input={};
             }
           },
           function(errorResponse){
             console.log("error: "+errorResponse);
             alert('error while saving');
           }
         );
    };
   }
]);