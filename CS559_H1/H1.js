function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var ssize = document.getElementById('slider1');
  var check = document.getElementById('switch');
  check.checked = false;
  ssize.value = 60;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var size = ssize.value;
    var event = check.checked;
    function DrawSun(color) {
      context.strokeStyle = "yellow";
      context.beginPath();
      context.arc(1000,200,size,0, Math.PI*2);
      context.fillStyle = color;
      context.fill();
      context.stroke();
    }
    //obtained from demo2
    function DrawSea(color) {
      context.fillStyle=color;
      context.beginPath();
      context.moveTo(0,550);context.lineTo(1280,550);context.lineTo(1280,720);
      context.lineTo(0,720);context.lineTo(0,550);
      context.fill();
  
   
     }
     function DrawNightSky(){
       context.fillStyle="#082345";
       context.globalCompositeOperation = 'destination-over';
       context.beginPath();
       context.moveTo(0,0);context.lineTo(1280,0);context.lineTo(1280,550);
       context.lineTo(0,550);context.lineTo(0,0);
       context.fill();
     }
    
     function DrawMoon() {
      var offset =0.6*size;
      context.beginPath();
      context.strokeStyle="gray";
      context.fillStyle = "grey";
      context.arc(300,200,size,0, Math.PI*2);
      context.fill();
      context.stroke();
      context.beginPath();
      context.strokeStyle="#082345";
      context.fillStyle = "#082345";
      context.arc(300+offset,200,size,0, Math.PI*2);
      context.fill();
      context.stroke();
     }
    
    // make sure you understand these
 
    DrawSea("blue");
    console.log(check);
    if(event==true){
      DrawMoon();
      DrawNightSky();
    }
    else{
      DrawSun("yellow");
    }
    
    
    context.restore();
    
  }
  ssize.addEventListener("input",draw);
  check.addEventListener("input",draw);

  draw();
}
window.onload = setup;


