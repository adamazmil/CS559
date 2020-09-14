function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  //var ssize = document.getElementById('size');
  //ssize.value = 20;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    //var size = ssize.value;

    function DrawCircle(color) {
      context.beginPath();
      context.arc(100,200,20,0, Math.PI*2);
      context.fillStyle = color;
      context.fill();
      context.stroke();
      
    }
    
    function DrawAxes(color) {
      context.strokeStyle=color;
      context.beginPath();
      // Axes
      context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
      // Arrowheads
      context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
      context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
      // X-label
      context.moveTo(130,0);context.lineTo(140,10);
      context.moveTo(130,10);context.lineTo(140,0);
      // Y-label
      context.moveTo(0,130);context.lineTo(5,135);context.lineTo(10,130);
      context.moveTo(5,135);context.lineTo(5,142);
      
      context.stroke();
  
   
     }
    
    // make sure you understand these
 
    DrawAxes("black");
    context.save();
    context.translate(dx,dy);
    DrawCircle("blue");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  //ssize.addEventListener("input",draw);
  draw();
}
window.onload = setup;


