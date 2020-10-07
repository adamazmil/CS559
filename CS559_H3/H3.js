function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var vert = document.getElementById  ('vertical');
  var mod = document.getElementById ('move');
  mod.value = 0;
  vert.value = 0;
  let v = 0;
  let theta = 0;
  theta = theta*(Math.PI/180);
  let cycle = false;
  let acycle = false; 
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    let angle1 = -40*(Math.PI/180);
    let angle2 = 85*(Math.PI/180);
    let angle3 = 70*(Math.PI/180);
    let angle4 = 35*(Math.PI/180);
    let angle5 = -20*(Math.PI/180);
    let stack = [mat3.create()];

    function moveToTx(x,y){
      let res=vec2.create(); 
      vec2.transformMat3(res,[x,y],stack[0]);
      context.moveTo(res[0],res[1]);
    }
    function lineToTx(x,y){
      let res=vec2.create(); 
      vec2.transformMat3(res,[x,y],stack[0]);
      context.lineTo(res[0],res[1]);
    }
    function body(size){
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.globalCompositeOperation = 'destination-over';
        context.beginPath();
        context.arc(0,0,size,0, Math.PI*2);
        context.fill();
        context.stroke();
    }
    function legs(){
         context.beginPath();
         context.fillStyle = "black";
        // context.moveTo(0,0);
        // context.lineTo(10,10);
        // context.lineTo(90,10);
        // context.lineTo(100,0);
        // context.lineTo(90,-10);
        // context.lineTo(10,-10);
        moveToTx(0,0);
        lineToTx(10,10);
        lineToTx(90,10);
        lineToTx(100,0);
        lineToTx(90,-10);
        lineToTx(10,-10);
        context.closePath();
        context.fill();
        
    }
    function web(){
       context.beginPath();
      context.strokeStyle = "gray";
    //   context.moveTo(0,0);
    //   context.lineTo(0,-360-(+v));
      moveToTx(0,0);
      lineToTx(0,-360-(+v));
      context.closePath();
      context.stroke();
    }
    function drawSpider(){
      // if (v<=250 && acycle == false){v =(v+1);}
      // else{
      //   acycle = true;
      //   v= v-1;
      //   if (v<0 && acycle == true) acycle = false;
      // }
      
      
      // if (theta>-0.10471975512 && cycle == false){theta = theta-(0.08*(Math.PI/180));}
      // else{
      //   cycle = true;
      //   theta = theta + (0.08*(Math.PI/180));
      //   if (theta>0.10471975512 && cycle == true) cycle = false;
      // }
      let web_to_canvas = mat3.create();
      mat3.fromTranslation(web_to_canvas,[500,240+(+v)]);
      mat3.multiply(stack[0],stack[0],web_to_canvas);
       //save
      web();
      stack.unshift(mat3.clone(stack[0]));
      context.setTransform(1,0,0,1.2,500,360+(+v));
      body(100);
      context.setTransform(0.8,0,0,0.8,500,460+(+v));
      body(50);
      context.setTransform(1,0,0,1,500,515+(+v));
      body(50);
      context.setTransform(1,0,0,1,0,0);
      //back leg R
      let b_1r_leg = mat3.create();
      mat3.fromTranslation(b_1r_leg,[0,100]);
      mat3.rotate(b_1r_leg,b_1r_leg,angle1+theta);
      mat3.scale(b_1r_leg,b_1r_leg,[2,1]);
      mat3.multiply(stack[0],stack[0],b_1r_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let b_2r_leg = mat3.create();
      mat3.fromTranslation (b_2r_leg,[100,0]);
      mat3.rotate(b_2r_leg,b_2r_leg,-angle2);
      mat3.scale(b_2r_leg,b_2r_leg,[2,0.5]);
      mat3.multiply(stack[0],stack[0],b_2r_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //back leg L
      let b_1l_leg = mat3.create();
      mat3.fromTranslation(b_1l_leg,[0,100]);
      mat3.rotate(b_1l_leg,b_1l_leg,-angle1 - theta);
      mat3.scale(b_1l_leg ,b_1l_leg, [-2,1]);
      mat3.multiply(stack[0],stack[0],b_1l_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let b_2l_leg = mat3.create();
      mat3.fromTranslation (b_2l_leg,[100,0]);
      mat3.rotate(b_2l_leg,b_2l_leg,-angle2);
      mat3.scale(b_2l_leg,b_2l_leg,[2,0.5]);
      mat3.multiply(stack[0],stack[0],b_2l_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //middle leg right
      let m_1r_leg = mat3.create();
      mat3.fromTranslation(m_1r_leg, [0,100]);
      mat3.scale(m_1r_leg,m_1r_leg,[2,1]);
      mat3.rotate(m_1r_leg,m_1r_leg, angle5+theta);
      mat3.multiply(stack[0],stack[0],m_1r_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let m_2r_leg = mat3.create();
      mat3.fromTranslation(m_2r_leg, [100,0]);
      mat3.scale(m_2r_leg,m_2r_leg,[0.5,1]);
      mat3.rotate(m_2r_leg, m_2r_leg, -angle3);
      mat3.multiply(stack[0],stack[0],m_2r_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //middle leg left
      let m_1l_leg = mat3.create();
      mat3.fromTranslation(m_1l_leg, [0,100]);
      mat3.scale(m_1l_leg,m_1l_leg,[-2,1]);
      mat3.rotate(m_1l_leg,m_1l_leg, angle5+theta);
      mat3.multiply(stack[0],stack[0],m_1l_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let m_2l_leg = mat3.create();
      mat3.fromTranslation(m_2l_leg, [100,0]);
      mat3.scale(m_2l_leg,m_2l_leg,[0.5,1]);
      mat3.rotate(m_2l_leg, m_2l_leg, -angle3);
      mat3.multiply(stack[0],stack[0],m_2l_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //2nd leg right
      let second_1r_leg = mat3.create();
      mat3.fromTranslation(second_1r_leg,[0,100]);
      mat3.rotate(second_1r_leg,second_1r_leg,angle4 - theta);
      mat3.scale(second_1r_leg,second_1r_leg, [1.5,1]);
      mat3.multiply(stack[0],stack[0],second_1r_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let second_2r_leg = mat3.create();
      mat3.fromTranslation(second_2r_leg,[100,0]);
      mat3.scale(second_2r_leg,second_2r_leg, [1/1.5,1]);
      mat3.rotate(second_2r_leg,second_2r_leg,angle3);
      mat3.multiply(stack[0],stack[0],second_2r_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //2nd leg left
      let second_1l_leg = mat3.create();
      mat3.fromTranslation(second_1l_leg,[0,100]);
      mat3.rotate(second_1l_leg,second_1l_leg,-angle4 + theta);
      mat3.scale(second_1l_leg,second_1l_leg, [-1.5,1]);
      mat3.multiply(stack[0],stack[0],second_1l_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let second_2l_leg = mat3.create();
      mat3.fromTranslation(second_2l_leg,[100,0]);
      mat3.scale(second_2l_leg,second_2l_leg, [1/1.5,1]);
      mat3.rotate(second_2l_leg,second_2l_leg,angle3);
      mat3.multiply(stack[0],stack[0],second_2l_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //1st leg right
      let f_1r_leg = mat3.create();
      mat3.fromTranslation(f_1r_leg,[0,170]);
      mat3.rotate(f_1r_leg,f_1r_leg, angle4 - theta);
      mat3.multiply(stack[0],stack[0],f_1r_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let f_2r_leg = mat3.create();
      mat3.fromTranslation(f_2r_leg,[100,0]);
      mat3.rotate(f_2r_leg,f_2r_leg, angle3);
      mat3.scale(f_2r_leg,f_2r_leg,[1.5,1]);
      mat3.multiply(stack[0],stack[0],f_2r_leg);
      legs();
      stack.shift();
      stack.shift();
      stack.unshift(mat3.clone(stack[0]));
      //1st leg left
      let f_1l_leg = mat3.create();
      mat3.fromTranslation(f_1l_leg,[0,170]);
      mat3.scale(f_1l_leg,f_1l_leg,[-1,1]);
      mat3.rotate(f_1l_leg,f_1l_leg, angle4 - theta);
      mat3.multiply(stack[0],stack[0],f_1l_leg);
      legs();
      stack.unshift(mat3.clone(stack[0]));
      let f_2l_leg = mat3.create();
      mat3.fromTranslation(f_2l_leg,[100,0]);
      mat3.rotate(f_2l_leg,f_2l_leg, angle3);
      mat3.scale(f_2l_leg,f_2l_leg,[1.5,1]);
      mat3.multiply(stack[0],stack[0],f_2l_leg);
      legs();

    //   context.translate (500, 360+(+v));
    //   context.save();
    //   web();
    //   context.scale(1,1.2);
    //   body(100);
    //   context.scale(1,1/1.2);
    //   context.translate(0,100);
    //   context.scale(1,0.8);
    //   body(50);
    //   context.scale(1,1/0.8);
    //   context.translate(0,55);
    //   body(50);
    //   context.restore();
    //   context.save();
    //   context.rotate(angle1 + theta);
    //   context.scale(2,1);
    //   //back legs
    //   legs();
    //   context.save();
    //   context.translate(100,0);
    //   context.scale(1/2,1);
    //   context.scale(1,2);
    //   context.rotate(-angle2);
    //   legs();
    //   //middle legs
    //   context.restore();
    //   context.restore();
    //   context.save();
    //   context.scale(2,1);
    //   context.rotate(angle5 + theta);
    //   legs();
    //   context.translate(100,0);
    //   context.scale(1/2,1);
    //   context.rotate(-angle3);
    //   legs();
    //   context.restore();
    //   context.restore();
    //   context.save();
    //   //2nd legs
    //   context.rotate(angle4 - theta);
    //   context.scale(1.5,1);
    //   legs();
    //   context.translate(100,0);
    //   context.scale(1/1.5,1);
    //   context.rotate(angle3);
    //   legs();
    //   context.restore();
    //   context.save();
    //   //1st legs
    //   context.translate(0,70);
    //   context.rotate(angle4 - theta);
    //   legs();
    //   context.translate(90,0);
    //   context.rotate(angle3);
    //   context.scale(1.5,1);
    //   legs();
    //   context.restore();
    //   context.save();
    //   //left side
    //   //lst legs
    //   context.translate(0,70);
    //   context.scale(-1,1);
    //   context.rotate(angle4 - theta );
    //   legs();
    //   context.translate(90,0);
    //   context.rotate(angle3);
    //   context.scale(1.5,1);
    //   legs();
    //   context.restore();
    //   context.save();
    //   //back legs
    //   context.rotate(-angle1 - theta);
    //   context.scale(-2,1);
    //   legs();
    //   context.save();
    //   context.translate(100,0);
    //   context.scale(1/2,1);
    //   context.scale(1,2);
    //   context.rotate(-angle2);
    //   legs();
    //   context.restore();
    //   context.restore();
    //   context.save();
    //   //middle legs
    //   context.scale(-2,1);
    //   context.rotate(angle5 + theta);
    //   legs();
    //   context.translate(100,0);
    //   context.scale(1/2,1);
    //   context.rotate(-angle3);
    //   legs();
    //   context.restore();
    //   context.restore();
    //   context.save();
    //   //2nd legs
    //   context.rotate(-angle4 + theta);
    //   context.scale(-1.5,1);
    //   legs();
    //   context.translate(100,0);
    //   context.scale(1/1.5,1);
    //   context.rotate(angle3);
    //   legs();
    //   context.restore();
    //   context.save();
    }
    drawSpider();
    // window.requestAnimationFrame(draw);

  }
  //window.requestAnimationFrame(draw);
  //vert.addEventListener("input",draw);
  //mod.addEventListener("input",draw);


  draw();
}
window.onload = setup;


