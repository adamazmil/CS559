function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var ssize = document.getElementById('slider1');
  ssize.value = 60;

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var size = ssize.value;

    function DrawCircle(color) {
      context.beginPath();
      context.arc(1000,200,size,0, Math.PI*2);
      context.fillStyle = color;
      context.fill();
      context.stroke();
      
    }
    //obtained from demo2
    function DrawAxes(color) {
      context.fillStyle=color;
      context.beginPath();
      // Sea
      context.moveTo(0,550);context.lineTo(1280,550);context.lineTo(1280,720);
      context.lineTo(0,720);context.lineTo(0,550);
      
      context.fill();
  
   
     }
    
    // make sure you understand these
 
    DrawAxes("blue");
    DrawCircle("yellow");
    context.restore();
    
  }
  ssize.addEventListener("input",draw);
  draw();
}
window.onload = setup;


