/*
TIPS:
  - In WEBGL render mode, init of box(x,y,z) starts from center of canvas. Translate is the way to go to move objects round

T0D0  
  - fix for responsivity in windowResized
  - let this be more general for several canvas sizes by using some scale field
*/

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(205,196,255);
  
}

function draw() {
  
  // drag to move the 3D canvas
  orbitControl();

  const control = 3;
  // cube
  fill(240,150,150);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  for (let i = 0; i < 5; i++){
    let dir = i%2 == 1 ? -1 : 1 ;     // direction
    push();
    translate(dir * (i * (width / 12)), dir * (i * (height / 12)), 0);
    rotateX(dir * frameCount * 0.02);
    rotateY(dir * frameCount * 0.02);
    strokeWeight(0.5);
    box(15,5,5);
    pop();
  }


    


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(205,196,255); 
}