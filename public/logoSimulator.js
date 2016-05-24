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

	function drawPosition(x,y) {
		ctx.fillStyle = "#000000";
		ctx.arc(x,y,5,0,2*Math.PI,false);
		ctx.lineWidth=2;
		ctx.strokeStyle="#003300";
		ctx.stroke();
	};


	

	function drawFd(length) {
		var currentPoint=Geometry.makePoint(currentPosition.x,currentPosition.y);
		var newPoint=Geometry.rotate(currentPoint,length,currentPosition.angle);

		if (currentPosition.pd) {
			Geometry.drawLine(ctx,currentPoint.x,currentPoint.y,newPoint.x,newPoint.y);
		}
		currentPosition.x=newPoint.x;
		currentPosition.y=newPoint.y;
	}

	function drawLt(angle) {
		currentPosition.angle+=-1*Math.radians(angle);
	}

	function drawRt(angle) {
		currentPosition.angle+=Math.radians(angle);
	}

	function drawPenUpOrDown(penUpOrDown) {
		if (penUpOrDown) {
			currentPosition.pd = (penUpOrDown.search(/^pd$/i) == 0);
		}
	}

	var draw=function(evaluatedCommands) {
		console.log("to evaluate");
		for (var cmdIdx in evaluatedCommands) {
			var currentCommand=evaluatedCommands[cmdIdx];
			if (currentCommand.fd) {
				console.log("drawing fd "+currentCommand.fd);
				drawFd(currentCommand.fd);
			} else if (currentCommand.rt) {
				drawRt(currentCommand.rt);
			} else if (currentCommand.lt) {
				drawLt(currentCommand.lt);
			} else if (currentCommand.penDownOrUp) {
				drawPenUpOrDown(currentCommand.penDownOrUp);
			}
		}

		var pos=Geometry.makePoint(currentPosition.x,currentPosition.y);
		Geometry.drawTriangle(ctx,pos,currentPosition.angle);
		console.log("current position: "+currentPosition);
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