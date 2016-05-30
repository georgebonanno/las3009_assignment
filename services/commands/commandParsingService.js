app.service('commandParsingService',function() {
	
	var parser = new LogoCommandParser();

	return {
		parseCommands: function(commandString) {
			var parsedCommands;
			if (commandString && commandString.trim()) {
				parsedCommands=parser.parseCommands(commandString);
			} else {
				parsedCommands=[];
			}
			return parsedCommands;
		} 
	}

});