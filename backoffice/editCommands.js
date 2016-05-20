var app=angular.module('CommandModule');
app.controller('EditController', ['$scope', '$http', 'commandRetrieval',
				'$routeParams', function ($scope, $http,commandRetrieval,$routeParams) {
	console.log("in edit controller");
	var editCtrl=this;
	this.test="hello pep!";

	console.log("activating edit controller");
	for(p in $routeParams) {
		console.log("param "+p+" "+$routeParams[p]);
	}
}]);
