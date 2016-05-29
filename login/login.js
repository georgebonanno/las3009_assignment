
var loginController = function ($scope, $http,commandRetrieval,
								$location,
							    AuthenticationService) {

	var loginCtrl=this;

	loginCtrl.name="";
	loginCtrl.password="";
	loginCtrl.message="";
	loginCtrl.alertClass="";

	loginCtrl.login=function() {

		console.log("attempting to log in with: "+loginCtrl.name);
		loginCtrl.message="";
		loginCtrl.alertClass="";

		var username=loginCtrl.name;
		var password=loginCtrl.password;
		AuthenticationService.Login(username, sha224(password)).then(function(){

			console.log("logged in with user "+username);
			$location.path('/evalLogo/commands');


		}, function(errormessage) {
			loginCtrl.message="login failed";
			loginCtrl.alertClass="alert-warning";
			console.log("failed to log in with error: "+
						 errormessage ? (errormessage.length && errormessage.length > 0 ?
						 					errormessage[0] : "<empty array>" )
						 				: errormessage);
		})
	}



};

angular.module('CommandModule')
	   .controller('LoginController', 
			   ['$scope', '$http', 'commandRetrieval','$location',
			    'AuthenticationService',
			   	loginController]); 

			   
