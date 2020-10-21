function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
	var slider1 = document.getElementById('slider1');
	var check = document.getElementById('switch');
	check.checked = true;
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	var trajectory = check.checked;
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-0.05,-0.05],Tx);
	    lineToTx([-0.05,0.05],Tx);
        lineToTx([0.05,0.05],Tx);
      	lineToTx([0.10,0.0],Tx);
	    lineToTx([0.05,-0.05],Tx);
	    context.closePath();
	    context.fill();
	}

	var C0 = function(t) {
            var x = t;
            var y = t*t;
            return [x,y];
	}
	var C0tan = function(t){
		var x = t;
		var y = 2*t;
		return [x,y];
	}

	var C1 = function(t) { // 
            var x = t;
            var y = -t*t+4*t-2;
            return [x,y];
	}

	var C1tan = function (t){
		var x = t;
		var y = -2*t+4;
		return [x,y];
	}

	var C2 = function(t) { // G1 continuity at t=1
            var x = t;
            var y = Math.cos(t)*Math.cos(t);
            return [x,y];
	}

	var C2tan = function (t) {
		var x = t;
		var y = -2*Math.cos(t)*Math.sin(t);
		return [x,y];
	}
	
	var Ccomp = function(t) {
            if(t<1) {
		return C0(t);
			}
			else if(t<3.00874 && t>1){
		return C1(t);
			}
			else if(t>3.00874 && t<=5){
		return C2(t);
			}
			
	}
	
	var Ccomptan = function (t) {
		if(t<1) {
			return C0tan(t);
				}
				else if(t<3.00874 && t>1){
			return C1tan(t);
				}
				else if(t>3.00874 && t<=5){
			return C2tan(t);
				}
	}


	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
            moveToTx(C(t_begin),Tx);
            for(var i=1;i<=intervals;i++){
		var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
		lineToTx(C(t),Tx);
            }
            context.stroke();
	}

	// make sure you understand these    

	
	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[50,750]);
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]); // Flip the Y-axis

	if(trajectory == true){
		drawTrajectory(0.0,1.0,100,C0,Tblue_to_canvas,"blue");
		drawTrajectory(1.0,3.00874,100,C1,Tblue_to_canvas,"blue");
		drawTrajectory(2.0,5.0,100,C2,Tblue_to_canvas,"blue");	
	}
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,Ccomp(tParam));
	var tangent = Ccomptan(tParam);
	var angle = Math.atan2(tangent[1],tangent[0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle);
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	drawObject("black",Tgreen_to_canvas);
    }

	slider1.addEventListener("input",draw);
	check.addEventListener("input",draw);
    draw();
}
window.onload = setup;