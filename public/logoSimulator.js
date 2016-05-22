var app=angular.module('CommandModule');
var logoCtrller=function($scope,commandRetrieval) {

	var logoCtrl=this;
	logoCtrl.currentCommands="";

	var canvas=document.getElementById('logoCanvas');
	var ctx=canvas.getContext('2d');
	var currentPosition={
		angle: 0,
		x: 20,
		y: 20
	}
	//ctx.moveTo(currentPosition.x,currentPosition.y);

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


	var throwParseError=function(message) {
		throw "parse error: "+message;
	}

	var evaluateFdStatement = function(words) {
		if (words.length != 2) {
			throwParseError("extra tokens in FD statement");
		} else if (words[1].search(/^\d+$/) != 0) {
			throwParseError("fd show have a number as argument and not "+words[i]);
		} else {
			return {
				fd: (1*words[1]) 
			}
		}
	}

	var evaluateStatement=function(statement) {
		var words=statement.split(" ");
		console.log("to evaluated statement composed of "+words);
		var evaluatedStatement = null;
		if (words.length > 0 && words[0]) {
			var command=words[0];
			if (command.search(/^fd$/i) == 0) {
				console.log("to evaluate fd statement")
				evaluatedStatement=evaluateFdStatement(words);
			} else {
				throwParseError("unknown statement: "+command);
			}
		} else {
			console.log("empty line found");
		}
		return evaluatedStatement;
	}

	var draw=function(evaluatedCommands) {
		console.log("to evaluate");
		for (var cmdIdx in evaluatedCommands) {
			var currentCommand=evaluatedCommands[cmdIdx];
			if (currentCommand.fd) {
				console.log("drawing fd");
			}
		}
		var pos=Geometry.makePoint(currentPosition.x,currentPosition.y);
		Geometry.drawTriangle(ctx,pos,currentPosition.angle);
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

			var commands=logoCtrl.currentCommands.split("\n");
			var evaluatedCommands=[];
			for(var i=0; i< commands.length; i++) {
				var statement=commands[i];
				if (statement) {
					statement=statement.trim();
					if (statement) {
						var evalStat=evaluateStatement(statement); 
						evalStat && evaluatedCommands.push(evalStat);
					}
				}
			}
			draw(evaluatedCommands);
			notifyOnExecution(true,"commands evaluated successfully!");
		} catch (e) {
			notifyOnExecution(false,e);	
		}
	}
};
app.controller('LogoController',
				['$scope','commandRetrieval',logoCtrller]);