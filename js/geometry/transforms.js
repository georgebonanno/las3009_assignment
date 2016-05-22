var Geometry = (function() {

	Math.radians=function(degrees) {
		return (degrees/180)*(Math.PI);
	};

	function drawLine(ctx,x,y,x1,y1) {
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x1,y1);
		ctx.stroke();
	}

	function hypotenuse(x,y) {
		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));	
	}

	function rotate(about,r,theta) {
		return {
			x: about.x+(r*Math.sin(theta)),
			y: about.y-(r*Math.cos(theta))
		};
	}

	function drawTriangle(ctx,origin,theta) {
		var left=makePoint(origin.x-10,origin.y+10);
		var right=makePoint(origin.x+10,origin.y+10);

		var rpLeft=rotatePoint(origin,left,theta);
		var rpRight=rotatePoint(origin,right,theta);

		drawLine(ctx,origin.x,origin.y,rpLeft.x,rpLeft.y);
		drawLine(ctx,origin.x,origin.y,rpRight.x,rpRight.y);
	}

	function findAngle(origin,point) {
		var angle=Math.atan((point.x-origin.x)/(origin.y-point.y));	
		if (point.y > origin.y && point.x < origin.x) {
			angle=Math.PI+angle;
		} else if (point.y > origin.y && point.x > origin.x) {
			angle=(Math.PI/2)+(-1*angle);
		}
		return angle;
	}

	function rotatePoint(origin,point,theta) {
		var rotatedPoint = 0;
		var vAngle=findAngle(origin,point);
		var length=hypotenuse(point.x-origin.x,
							  origin.y-point.y);

		rotatedPoint=rotate(origin,length,theta+vAngle);

		var length2=hypotenuse(rotatedPoint.x-origin.x,
							  origin.y-rotatedPoint.y);
		return rotatedPoint;
	}

	function makePoint(x,y) {
		return {
			x:x,
			y:y
		};
	}

	return {
		drawLine: drawLine,
		drawTriangle: drawTriangle,
		findAngle: findAngle,
		rotatePoint: rotatePoint,
		makePoint: makePoint,
		hypotenuse: hypotenuse,
		rotate: rotate
	};
})();