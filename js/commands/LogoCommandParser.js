function LogoCommandParser(commands) {

	var previousLastIndex = -1;

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

	var evaluateStatement=function(command,operand) {
		var evaluatedStatement = null;
		var words=[command,operand];
		if (command  && operand) {
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

	function _parseCommands(inputtedCommands) {
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

	function parseRepeat(inputtedCommands,commandPattern,
						 matchedCommand) {
		console.log("parsing repeat");
		//repeat number is found in regex capture group 3
		var repeatNumber=matchedCommand[3];
		console.log("number of repetitions: "+repeatNumber);
		var repeatBlockStruct=parseCommands(inputtedCommands,commandPattern,true);
		return {
			repeat: {
				reps: 1*repeatNumber,
				commandsToRep: repeatBlockStruct
			}
		};
	}

	function skipLineSeparator(inputtedCommands,lastIndex) {
		var lineSep=/\s*[;\n]\s*/g;
		lineSep.lastIndex=lastIndex;
		var seperator=(lineSep.exec(inputtedCommands));
		var lastIndex;
		if (seperator) {
			lastIndex=seperator.lastIndex;
		} else {
			throw new Error("statement seperator expected at index "+lastIndex);
		}
		return lineSep.lastIndex;
	}

	function parseCommands(inputtedCommands,
						  commandPattern,parsingForRepeat) {
		parsingForRepeat = parsingForRepeat ? parsingForRepeat : false;
		if (!commandPattern) {
			//first call to parse commands
			commandPattern =
				/\s*((repeat\[(\d+),)|(([a-z]+)\((\d+)\))\s*[\n;]\s*)/ig;
			previousLastIndex = -1;
		}
		var matchedCommand;
		var matched;
		var parsedCommands=[];
		/*
			keepParsing indicates to the command searching loop
			to stop if a repeat statement is being parsed and a ]
			is found
		*/
		var keepParsing=true;
		while(keepParsing &&
				(matched=commandPattern.exec(inputtedCommands))) {
			if ((previousLastIndex == -1 && matched.index != 0) ||
				(previousLastIndex != -1 &&
					previousLastIndex != matched.index)) {
				var atIndex=previousLastIndex == -1 ? 0 : previousLastIndex;
				throw new Error("unexpected character at position "+atIndex);
			}
			var matchedCommand=matched[1];
			var parsedStruct;
			if (matchedCommand && matchedCommand.match(/^repeat\[/)) {
				previousLastIndex=commandPattern.lastIndex;
				parsedStruct=parseRepeat(inputtedCommands,commandPattern,
										matched);
			} else if (matchedCommand.match(/^repeat\[/)) {
				console.log("[ matched");
			}else {
				//get operand in brackets
				var command=matched[5]
				var operand = matched[6];
				console.log("attempting to parsed command "+commandPattern+
					" with operand "+operand);
				parsedStruct=evaluateStatement(command,operand);

			}
			console.log("command parsed: "+JSON.stringify(parsedStruct));
			parsedCommands.push(parsedStruct);
			if (parsingForRepeat && 
					inputtedCommands[commandPattern.lastIndex] == ']') {
				commandPattern.lastIndex=skipLineSeparator(inputtedCommands,
															commandPattern.lastIndex+1);
				keepParsing=false;
				console.log("found closing repeat!");
			}
			previousLastIndex=commandPattern.lastIndex;
		}

		return parsedCommands;
	}

	return {
		parseCommands:parseCommands
	}
}