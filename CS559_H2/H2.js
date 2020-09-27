function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    let angle1 = -55*(Math.PI/180);
    let angle2 = 90*(Math.PI/180);
    let angle3 = 65*(Math.PI/180);
    let angle4 = 25*(Math.PI/180);
    function body(size){
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(0,0,size,0, Math.PI*2);
        context.fillStyle = "black";
        context.fill();
        context.stroke();
    }
    function legs(){
        context.beginPath();
        context.fillStyle = "grey";
        context.moveTo(0,0);
        context.lineTo(10,10);
        context.lineTo(90,10);
        context.lineTo(100,0);
        context.lineTo(90,-10);
        context.lineTo(10,-10);
        context.closePath();
        context.fill();
    }
    context.translate (500, 360);
    context.save();
    body(100);
    context.translate(0,100);
    body(50);
    context.restore();
    context.save();
    context.rotate(angle1);
    context.scale(2.0,1);
    legs();
    context.save();
    context.translate(100,0);
    context.scale(0.5,2);
    context.rotate(angle2);
    legs();
    context.restore();
    context.restore();
    context.save();
    context.scale(2,1)
    legs();
    context.translate(100,0);
    context.save();
    context.rotate(angle3);
    context.scale(1,0.70);
    legs();
    context.restore();
    context.restore();
    context.save();
    context.rotate(angle4);
    context.scale(1.5,1);
    legs();
    context.translate(100,0);
    context.save();
    context.rotate(angle3);
    context.scale(1.5,0.8);
    legs();
    
    
    
  }

  draw();
}
window.onload = setup;


