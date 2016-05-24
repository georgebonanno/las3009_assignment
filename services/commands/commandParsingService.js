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

	var evaluateLtStatement = function(words) {
		if (words.length != 2) {
			throwParseError("extra tokens in FD statement");
		} else if (words[1].search(/^\d+$/) != 0) {
			throwParseError("lt show have a number as argument and not "+words[i]);
		} else {
			return {
				lt: (1*words[1]) 
			}
		}
	}

	var evaluatePdOrPuStatement=function(words) {
		if (words.length != 1) {
			throwParseError("extra tokens in Pd statement");
		} else {
			return {
				penDownOrUp: words[0]
			}
		}
	}

	var evaluateStatement=function(statement) {
		var words=statement.split(" ");
		console.log("to evaluated statement composed of "+words);
		var evaluatedStatement = null;
		if (words.length > 0 && words[0]) {
			var command=words[0];
			command = command ? command.trim() : "";
			if (command.search(/^fd$/i) == 0) {
				console.log("to evaluate fd statement")
				evaluatedStatement=evaluateFdStatement(words);
			} else if (command.search(/^rt$/i) == 0) {
				console.log("to evaluate rt statement")
				evaluatedStatement=evaluateRtStatement(words);
			} else if (command.search(/^lt$/i) == 0) {
				console.log("to evaluate rt statement")
				evaluatedStatement=evaluateLtStatement(words);
			} else if (command.search(/^p[ud]$/i) == 0) {
				console.log("to evaluate pu/pd statement")
				evaluatedStatement=evaluatePdOrPuStatement(words);
			} else {
				throwParseError("unknown statement: ["+command+"]");
			}
		} else {
			console.log("empty line found");
		}
		return evaluatedStatement;
	}

	function parseCommands(inputtedCommands) {
		//statements can be split by newline or a semicolon 
		var commands=inputtedCommands.split(/[\n;]/);
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