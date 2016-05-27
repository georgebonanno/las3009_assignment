var app=angular.module('CommandModule');
var logoCtrller=function($scope,commandRetrieval) {

	var logoCtrl=this;
	logoCtrl.currentCommands="";

	var canvas=document.getElementById('logoCanvas');
	var ctx=canvas ? canvas.getContext('2d') : null;

	logoCtrl.coms="";

	logoCtrl.clearPreviousDrawing=false;

	var currentPosition={
			angle: 0,
			x: 0,
			y: 0,
			pd: true
		};

	function init() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		currentPosition.angle=0;
		currentPosition.x=canvas.width/2;
		currentPosition.y=canvas.height/2;
		currentPosition.pd=true;
	}


	function clearParts(clearCanvas,clearCommands) {
		if (clearCanvas) {
			logoCtrl.coms="";
			logoCtrl.clearPreviousDrawing=true;
		}
		if (clearCommands) {
			logoCtrl.currentCommands = "";
		}
	}

	logoCtrl.clear=function() {
		clearParts(true,true);
	}

	logoCtrl.clearDrawing=function() {
		clearParts(true,false);
	}

	logoCtrl.clearCommands=function() {
		clearParts(false,true);
	}

	//init();

	commandRetrieval.loadCommands()
		.then(function(response) {
			logoCtrl.commands=response.data;
		},
		function(errorResponse) {
			alert("alert in retrieving commands");
		});
	logoCtrl.selectedCommandDescription="should place description";

	logoCtrl.describe=function(command) {
		console.log("mouse over "+command);
		if (command) {
			logoCtrl.selectedCommandDescription=command.commandDescription;					
		}
	}

	logoCtrl.commandSelected=function(command) {
		if (command) {
			logoCtrl.currentCommands+=command.id+"\n";
		}
	}


	var notifyOnExecution = function(success,message) {
		if (success) {
			logoCtrl.alertClass="alert-success";
		} else {
			logoCtrl.alertClass="alert-warning";
		}
		logoCtrl.execOutcomeMessage=message;
	}

	logoCtrl.evaluate=function (){
		try {

			logoCtrl.clearPreviousDrawing=false;
			var inputtedCommands=logoCtrl.currentCommands;
			logoCtrl.coms=logoCtrl.currentCommands;
		} catch (e) {
			var message;
			if (e.message) {
				message=e.message;
				console.log(e.stack);
			} else {
				message=e;
			}
		}
	};



	logoCtrl.onEvalError=function(errorMessage) {
		console.log("an error occured during execution: "+errorMessage);
		notifyOnExecution(false,errorMessage);	
	}

	logoCtrl.onEvalSuccess=function() {
		console.log("commands evaluated successfully!");
		notifyOnExecution(true,"commands evaluated successfully!");
	}

	logoCtrl.shouldClearPrevious =function() {
		return logoCtrl.clearPreviousDrawing;
	}
}; 
app.controller('LogoController',
				['$scope','commandRetrieval',logoCtrller]);