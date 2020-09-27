function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;

    function body(){
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(640,360,100,0, Math.PI*2);
        context.fillStyle = "black";
        context.fill();
        context.stroke();
    }

    body();
    context.restore();
  }

  draw();
}
window.onload = setup;


