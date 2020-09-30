function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var vert = document.getElementById  ('vertical');
  var mod = document.getElementById ('move');
  mod.value = 0;
  vert.value = 0;
  

  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    let theta = mod.value*(Math.PI/180);
    let v = vert.value;
    let angle1 = -40*(Math.PI/180);
    let angle2 = 85*(Math.PI/180);
    let angle3 = 70*(Math.PI/180);
    let angle4 = 35*(Math.PI/180);
    let angle5 = -20*(Math.PI/180);
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
        context.fillStyle = "black";
        context.moveTo(0,0);
        context.lineTo(10,10);
        context.lineTo(90,10);
        context.lineTo(100,0);
        context.lineTo(90,-10);
        context.lineTo(10,-10);
        context.closePath();
        context.fill();
    }
    function web(){
      context.beginPath();
      context.strokeStyle = "gray";
      context.moveTo(0,0);
      context.lineTo(0,-360-(+v));
      context.closePath();
      context.stroke();
    }
    function drawSpider(){
      context.translate (500, 360+(+v));
      context.save();
      web();
      context.scale(1,1.2);
      body(100);
      context.scale(1,1/1.2);
      context.translate(0,100);
      context.scale(1,0.8);
      body(50);
      context.scale(1,1/0.8);
      context.translate(0,55);
      body(50);
      context.restore();
      context.save();
      context.rotate(angle1 + theta);
      context.scale(2,1);
      //back legs
      legs();
      context.save();
      context.translate(100,0);
      context.scale(1/2,1);
      context.scale(1,2);
      context.rotate(-angle2);
      legs();
      //middle legs
      context.restore();
      context.restore();
      context.save();
      context.scale(2,1);
      context.rotate(angle5 + theta);
      legs();
      context.translate(100,0);
      context.scale(1/2,1);
      context.rotate(-angle3);
      legs();
      context.restore();
      context.restore();
      context.save();
      //2nd legs
      context.rotate(angle4 - theta);
      context.scale(1.5,1);
      legs();
      context.translate(100,0);
      context.scale(1/1.5,1);
      context.rotate(angle3);
      legs();
      context.restore();
      context.save();
      //1st legs
      context.translate(0,70);
      context.rotate(angle4 - theta);
      legs();
      context.translate(90,0);
      context.rotate(angle3);
      context.scale(1.5,1);
      legs();
      context.restore();
      context.save();
      //left side
      //lst legs
      context.translate(0,70);
      context.scale(-1,1);
      context.rotate(angle4 - theta );
      legs();
      context.translate(90,0);
      context.rotate(angle3);
      context.scale(1.5,1);
      legs();
      context.restore();
      context.save();
      //back legs
      context.rotate(-angle1 - theta);
      context.scale(-2,1);
      legs();
      context.save();
      context.translate(100,0);
      context.scale(1/2,1);
      context.scale(1,2);
      context.rotate(-angle2);
      legs();
      context.restore();
      context.restore();
      context.save();
      //middle legs
      context.scale(-2,1);
      context.rotate(angle5 + theta);
      legs();
      context.translate(100,0);
      context.scale(1/2,1);
      context.rotate(-angle3);
      legs();
      context.restore();
      context.restore();
      context.save();
      //2nd legs
      context.rotate(-angle4 + theta);
      context.scale(-1.5,1);
      legs();
      context.translate(100,0);
      context.scale(1/1.5,1);
      context.rotate(angle3);
      legs();
      context.restore();
      context.save();
    }
    context.scale(0.8,0.8);
    drawSpider();
    
    
    
  }
  vert.addEventListener("input",draw);
  mod.addEventListener("input",draw);
  draw();
}
window.onload = setup;


