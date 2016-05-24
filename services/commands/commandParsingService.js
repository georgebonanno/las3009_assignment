app.service('commandParsing',function() {
	
	var throwParseError=function(message) {
		throw new Error("parse error: "+message);
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

	var evaluateRtStatement = function(words) {
		if (words.length != 2) {
			throwParseError("extra tokens in FD statement");
		} else if (words[1].search(/^\d+$/) != 0) {
			throwParseError("rt show have a number as argument and not "+words[i]);
		} else {
			return {
				rt: (1*words[1]) 
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
			} else if (command.search(/^rt$/i) == 0) {
				console.log("to evaluate rt statement")
				evaluatedStatement=evaluateRtStatement(words);
			} else {
				throwParseError("unknown statement: "+command);
			}
		} else {
			console.log("empty line found");
		}
		return evaluatedStatement;
	}

	function parseCommands(inputtedCommands) {
		var commands=inputtedCommands.split("\n");
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
		return evaluatedCommands;
	}

	return {
		parseCommands: parseCommands
	}

});