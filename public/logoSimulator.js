var app=angular.module('CommandModule');
var logoCtrller=function($scope,commandRetrieval,commandParsing) {

	var logoCtrl=this;
	logoCtrl.currentCommands="";

	var canvas=document.getElementById('logoCanvas');
	var ctx=canvas ? canvas.getContext('2d') : null;

	logoCtrl.coms={};

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

	logoCtrl.clear=function() {
		init();
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

			var inputtedCommands=logoCtrl.currentCommands;
			var evaluatedCommands=commandParsing.parseCommands(inputtedCommands);	
			logoCtrl.coms=evaluatedCommands;
			//draw(evaluatedCommands);
			notifyOnExecution(true,"commands evaluated successfully!");
		} catch (e) {
			var message;
			if (e.message) {
				message=e.message;
				console.log(e.stack);
			} else {
				message=e;
			}
			notifyOnExecution(false,message);	
		}
	}
};
app.controller('LogoController',
				['$scope','commandRetrieval','commandParsing',logoCtrller]);