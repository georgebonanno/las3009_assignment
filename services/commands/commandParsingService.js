app.service('commandParsingService',function() {
	
	var parser = new LogoCommandParser();

	return {
		parseCommands: function(commandString) {
			return parser.parseCommands(commandString);
		} 
	}

});