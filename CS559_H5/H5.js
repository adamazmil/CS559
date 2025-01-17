function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  let slider1 = document.getElementById('slider1');
  slider1.value = 0; 
  let v = 0;
  let theta = 0;
  theta = theta*(Math.PI/180);
  let cycle = false;
  let acycle = false;
  
  function draw() {
    var context = canvas.getContext('2d');
     
    var viewAngle = slider1.value*0.02*Math.PI;
    canvas.width = canvas.width;
    let angle1 = -40*(Math.PI/180);
    let angle2 = 85*(Math.PI/180);
    let angle3 = 70*(Math.PI/180);
    let angle4 = 35*(Math.PI/180);
    let angle5 = -20*(Math.PI/180);
    let stack = [mat4.create()];
    var background = new Image();
    background.src = "Mccavern.png";
      context.drawImage(background,0,0); 
    function moveToTx(x,y,z){
      let res=vec3.create(); 
      vec3.transformMat4(res,[x,y,z],stack[0]);
      context.moveTo(res[0],res[1]);
    }
    function lineToTx(x,y,z){
      let res=vec3.create(); 
      vec3.transformMat4(res,[x,y,z],stack[0]);
      context.lineTo(res[0],res[1]);
    }
    function body(z){
      context.beginPath();
      context.fillStyle = "black";
      context.strokeStyle = "Gray";
      moveToTx(0,0,z);
      lineToTx(0,200,z);
      lineToTx(200,200,z);
      lineToTx(200,0,z);
      lineToTx(0,0,z); 
      context.closePath();
      context.fill();
      context.stroke()
    }
    function bodyz(depth){
      for(let i = 0;i<depth;i++){
          body(i);
      }

  }
    function legs(z){
        context.beginPath();
        context.fillStyle = "black";
        context.strokeStyle = "Gray";
        moveToTx(0,0,z);
        lineToTx(10,10,z);
        lineToTx(90,10,z);
        lineToTx(100,0,z);
        lineToTx(90,-10,z);
        lineToTx(10,-10,z);
        context.closePath();
        context.fill();
        context.stroke();
        
    }
    function legsz(){
        for(let i = 0;i<10;i++){
            legs(i);
        }

    }
    function web(){
       context.beginPath();
      context.strokeStyle = "gray";
      moveToTx(0,0,0);
      lineToTx(0,-360-(+v),0);
      context.closePath();
      context.stroke();
    }
    function SetCam(){

        //sets up lookat     
        let eye = vec3.create();
        let dist = 200.0;
        eye[0] = dist*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = dist*Math.cos(viewAngle);
        let target = vec3.fromValues(500,200,0);
        let up = vec3.fromValues(0,100,0);
        let lookAtCam = mat4.create();
        mat4.lookAt(lookAtCam,eye,target,up); //lookat matrix
    
        //sets up projection system
    
        let ortho = mat4.create();
        mat4.ortho(ortho,-110,110,-110,110,-110,1); //ortho matrix
    
        //setting up VIEWPORT
        
        let viewport = mat4.create(); //viewport matrix 
        //moves center of camera to 400,400,0 and flips it
        mat4.fromTranslation(viewport,[400,300,0]);
        mat4.scale(viewport,viewport,[200,100,1]);
        //canvas matrix
        let projection = mat4.create();
        mat4.multiply(projection,viewport,ortho);
        mat4.multiply(projection,projection,lookAtCam);
        mat4.multiply(stack[0],stack[0],projection);
        }
    function drawSpider(){
      if (v<=210 && acycle == false){v =(v+0.3);}
      else{
        acycle = true;
        v= v-0.3;
        if (v<0 && acycle == true) acycle = false;
      }
      if (theta>-0.10471975512 && cycle == false){theta = theta-(0.03*(Math.PI/180));}
      else{
        cycle = true;
        theta = theta + (0.03*(Math.PI/180));
        if (theta>0.10471975512 && cycle == true) cycle = false;
      }
      let web_to_canvas = mat4.create();
      mat4.fromTranslation(web_to_canvas,[500,240+(+v),0]);
      mat4.multiply(stack[0],stack[0],web_to_canvas);
       //save
      web();
      stack.unshift(mat4.clone(stack[0]));
      //back leg R
      let b_1r_leg = mat4.create();
      mat4.fromTranslation(b_1r_leg,[0,100,0]);
      mat4.rotateZ(b_1r_leg,b_1r_leg,angle1+theta);
      mat4.scale(b_1r_leg,b_1r_leg,[2,1,1]);
      mat4.multiply(stack[0],stack[0],b_1r_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let b_2r_leg = mat4.create();
      mat4.fromTranslation (b_2r_leg,[100,0,0]);
      mat4.rotateZ(b_2r_leg,b_2r_leg,-angle2);
      mat4.scale(b_2r_leg,b_2r_leg,[2,0.5,1]);
      mat4.multiply(stack[0],stack[0],b_2r_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //back leg L
      let b_1l_leg = mat4.create();
      mat4.fromTranslation(b_1l_leg,[0,100,0]);
      mat4.rotateZ(b_1l_leg,b_1l_leg,-angle1 - theta);
      mat4.scale(b_1l_leg ,b_1l_leg, [-2,1,1]);
      mat4.multiply(stack[0],stack[0],b_1l_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let b_2l_leg = mat4.create();
      mat4.fromTranslation (b_2l_leg,[100,0,0]);
      mat4.rotateZ(b_2l_leg,b_2l_leg,-angle2);
      mat4.scale(b_2l_leg,b_2l_leg,[2,0.5,1]);
      mat4.multiply(stack[0],stack[0],b_2l_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //middle leg right
      let m_1r_leg = mat4.create();
      mat4.fromTranslation(m_1r_leg, [0,100,0]);
      mat4.scale(m_1r_leg,m_1r_leg,[2,1,1]);
      mat4.rotateZ(m_1r_leg,m_1r_leg, angle5+theta);
      mat4.multiply(stack[0],stack[0],m_1r_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let m_2r_leg = mat4.create();
      mat4.fromTranslation(m_2r_leg, [100,0,0]);
      mat4.scale(m_2r_leg,m_2r_leg,[0.5,1,1]);
      mat4.rotateZ(m_2r_leg, m_2r_leg, -angle3);
      mat4.multiply(stack[0],stack[0],m_2r_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //middle leg left
      let m_1l_leg = mat4.create();
      mat4.fromTranslation(m_1l_leg, [0,100,0]);
      mat4.scale(m_1l_leg,m_1l_leg,[-2,1,1]);
      mat4.rotateZ(m_1l_leg,m_1l_leg, angle5+theta);
      mat4.multiply(stack[0],stack[0],m_1l_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let m_2l_leg = mat4.create();
      mat4.fromTranslation(m_2l_leg, [100,0,0]);
      mat4.scale(m_2l_leg,m_2l_leg,[0.5,1,1]);
      mat4.rotateZ(m_2l_leg, m_2l_leg, -angle3);
      mat4.multiply(stack[0],stack[0],m_2l_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //2nd leg right
      let second_1r_leg = mat4.create();
      mat4.fromTranslation(second_1r_leg,[0,100,0]);
      mat4.rotateZ(second_1r_leg,second_1r_leg,angle4 - theta);
      mat4.scale(second_1r_leg,second_1r_leg, [1.5,1,1]);
      mat4.multiply(stack[0],stack[0],second_1r_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let second_2r_leg = mat4.create();
      mat4.fromTranslation(second_2r_leg,[100,0,0]);
      mat4.scale(second_2r_leg,second_2r_leg, [1/1.5,1,1]);
      mat4.rotateZ(second_2r_leg,second_2r_leg,angle3);
      mat4.multiply(stack[0],stack[0],second_2r_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //2nd leg left
      let second_1l_leg = mat4.create();
      mat4.fromTranslation(second_1l_leg,[0,100,0]);
      mat4.rotateZ(second_1l_leg,second_1l_leg,-angle4 + theta);
      mat4.scale(second_1l_leg,second_1l_leg, [-1.5,1,1]);
      mat4.multiply(stack[0],stack[0],second_1l_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let second_2l_leg = mat4.create();
      mat4.fromTranslation(second_2l_leg,[100,0,0]);
      mat4.scale(second_2l_leg,second_2l_leg, [1/1.5,1,1]);
      mat4.rotateZ(second_2l_leg,second_2l_leg,angle3);
      mat4.multiply(stack[0],stack[0],second_2l_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //1st leg right
      let f_1r_leg = mat4.create();
      mat4.fromTranslation(f_1r_leg,[0,170,0]);
      mat4.rotateZ(f_1r_leg,f_1r_leg, angle4 - theta);
      mat4.multiply(stack[0],stack[0],f_1r_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let f_2r_leg = mat4.create();
      mat4.fromTranslation(f_2r_leg,[100,0,0]);
      mat4.rotateZ(f_2r_leg,f_2r_leg, angle3);
      mat4.scale(f_2r_leg,f_2r_leg,[1.5,1,1]);
      mat4.multiply(stack[0],stack[0],f_2r_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
      //1st leg left
      let f_1l_leg = mat4.create();
      mat4.fromTranslation(f_1l_leg,[0,170,0]);
      mat4.scale(f_1l_leg,f_1l_leg,[-1,1,1]);
      mat4.rotateZ(f_1l_leg,f_1l_leg, angle4 - theta);
      mat4.multiply(stack[0],stack[0],f_1l_leg);
      legsz();
      stack.unshift(mat4.clone(stack[0]));
      let f_2l_leg = mat4.create();
      mat4.fromTranslation(f_2l_leg,[100,0,0]);
      mat4.rotateZ(f_2l_leg,f_2l_leg, angle3);
      mat4.scale(f_2l_leg,f_2l_leg,[1.5,1,1]);
      mat4.multiply(stack[0],stack[0],f_2l_leg);
      legsz();
      stack.shift();
      stack.shift();
      stack.unshift(mat4.clone(stack[0]));
       let back = mat4.create();
       mat4.fromTranslation(back,[-80,-80,-10]);
       mat4.multiply(stack[0],stack[0],back);
       bodyz(30);
       stack.shift();
       stack.unshift(mat4.clone(stack[0]));
      let mid = mat4.create();

       mat4.fromTranslation(mid,[0,120,0]);
       mat4.scale(mid,mid,[0.3,0.3,1]);
       mat4.multiply(stack[0],stack[0],mid);
       bodyz(20);
       let mouth = mat4.create();
       mat4.fromTranslation(mouth,[-70,210,0]);
       mat4.scale(mouth,mouth,[2,2,1.]);
       mat4.multiply(stack[0],stack[0],mouth);
       bodyz(20);
    }
    
    SetCam();
    drawSpider();
    
    window.requestAnimationFrame(draw);

  }
  
  draw();
}
window.onload = setup;