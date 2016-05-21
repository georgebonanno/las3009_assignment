var app=angular.module('CommandModule');
var logoCtrller=function($scope,commandRetrieval) {

	var logoCtrl=this;
	logoCtrl.currentCommands="";
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

	logoCtrl.evaluate=function (){
		var canvas=document.getElementById('logoCanvas');
		var ctx=canvas.getContext('2d');
		ctx.fillStyle= "#FF0000";
		ctx.fillRect(0,0,30,30);
		ctx.stroke();
	}
};
app.controller('LogoController',
				['$scope','commandRetrieval',logoCtrller]);