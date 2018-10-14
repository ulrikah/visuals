/*


NB! 

small cols and rows => huge processing time

*/


let cols, rows;
let farger = [];
let scl;

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(250);

  scl = width/150;
  cols = width/scl;
  rows = height/scl;
  farger = [  "#87ceff",
              "#f7cac9"];
  
  createMosaique();
  


}

function draw(){
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createMosaique();
}

function createMosaique() {
    strokeWeight(0.2);
    for(let x=0; x < cols; x++){
      for(let y=0; y < rows; y++){
      i = Math.floor(Math.random() * farger.length);
      fill(farger[i]);
      rect(x*scl,y*scl,scl,scl);
      }
    }
}