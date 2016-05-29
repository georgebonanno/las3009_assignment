function LogoDrawing(canvas) {

	var ctx = canvas.getContext('2d');

	var commandSoFar=[];

	function drawPosition(x,y) {
		ctx.fillStyle = "#000000";
		ctx.arc(x,y,5,0,2*Math.PI,false);
		ctx.lineWidth=2;
		ctx.strokeStyle="#003300";
		ctx.stroke();
	};

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

	function drawRepeat(repeatCommand) {
		var reps=repeatCommand.reps;
		var commandsToRep=repeatCommand.commandsToRep;

		for(var cnt=0; cnt<reps; cnt++) {
			drawWithCommands(commandsToRep);
		}
	}

	var drawWithCommands=function(evaluatedCommands) {
		
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
			} else if (currentCommand.repeat) {
				drawRepeat(currentCommand.repeat);
			}
		}

		var currentPos=Geometry.makePoint(currentPosition.x,currentPosition.y);
		return currentPos;
	}

	var draw=function(clearPrevious,evaluatedCommands) {
		console.log("to evaluate");
		init();
		if (clearPrevious) {
			console.log("clearing previous commands");
			commandSoFar.length=0;
		} 
		commandSoFar=commandSoFar.concat(evaluatedCommands);		
		var currentPos=drawWithCommands(commandSoFar);
		Geometry.drawTriangle(ctx,currentPos,currentPosition.angle);
		console.log("current position: "+currentPosition);
	}

	init();

	return {
		draw: draw
	}

}