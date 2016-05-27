app.directive('showLogo',['commandParsingService',function(commandParsingService) {

	var controller = function() {

		console.log("to draw = "+this.todraw);
	};



	return {
		restrict: 'E',
		templateUrl: 'directives/show-logo.html',
		scope: {
			todraw: '@todraw',
			onSuccess: '&',
			onError: '&',
			clearPrevious: '&'
		},
		link: function(scope, element, attrs) {
            
			scope.canvas = element.find('canvas')[0];
			var errorHandler=scope.onError;
			var onSuccessHandler=scope.onSuccess;
			var logoDrawing = new LogoDrawing(scope.canvas);
			var clearPrevious = scope.clearPrevious;
	        
            scope.$watch("todraw", function(drawCommands) {
            	try {
	            	console.log("command to evaluate by logo directive: "+drawCommands);
	            	var parsedCommands=commandParsingService.parseCommands(drawCommands);

	            	//only the 'turtle' (actually the triangle is drawn) is
	            	//there are no commands;
	            	var clearPreviousDrawing=clearPrevious();
	    			logoDrawing.draw(clearPreviousDrawing,parsedCommands);

	    			if (drawCommands) {
	    				//call the success  handler if any commands were evaluated
	    				onSuccessHandler();
	    			}

    			} catch (e) {
    				var errorMessage;
    				if (e && e.message) {
    					console.log("error during evaluation of "+parsedCommands+" "+e.stack);
    					errorMessage=e.message;
    				} else {
    					errorMessage=e;
    				}
	    			errorHandler({errorMessage: errorMessage});
    			}
            });
        }

	};
}]);