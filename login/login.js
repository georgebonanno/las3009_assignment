
var loginController = function ($scope, $http,commandRetrieval,
							    AuthenticationService) {

	var loginCtrl=this;

	loginCtrl.name="";
	loginCtrl.password="";

	loginCtrl.login=function() {

		console.log("attempting to log in with: "+loginCtrl.name);

		var username=loginCtrl.name;
		var password=loginCtrl.password;
		AuthenticationService.Login(username, password).then(function(){

			console.log("logged in with user "+username);


		}, function(errormessage) {
			console.log("failed to log in with error: "+errormessage);
		})
	}



};

angular.module('CommandModule')
	   .controller('LoginController', 
			   ['$scope', '$http', 'commandRetrieval',
			    'AuthenticationService',
			   	loginController]); 

			   
