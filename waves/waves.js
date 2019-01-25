// sine wave functionality by Daniel Shiffman - https://p5js.org/examples/math-sine-wave.html

let theta, amplitude, period;     


let combien = 10;     // Number of waves
let xspacing = 2;     // Distance between each horizontal location
let w;                // Width of entire wave
let dx;               // Value for incrementing x
let yvalues;          // Using an array to store height values for the wave
let two_pi = 6.28318530717958647693;           // Only to address some issue with global constant TWO_PI

let waves = [];

function setup (){
    createCanvas(800,800);
    pixelDensity(1);
    w = width/4 + 30;
    yvalues = new Array(floor(w/xspacing));

    for (let i=0; i < combien; i++){
      wave = new Wave();
      waves.push(wave);
    }
}


function draw () {
    background(255);
    for (let i=0; i < waves.length; i++){
      push();
      translate(0, 20*i);
      waves[i].calcWave();
      waves[i].renderWave(4);
      pop();
    } 
}

function Wave () {
  // init obj vars
  this.theta = 0.0;           // Start angle at 0
  this.amplitude = 15.0;      // Height of wave
  this.period = 300;          // How many pixels before the wave repeats
  this.yvalues = yvalues;
  this.dx = (two_pi / this.period) * xspacing;

  this.calcWave = function () {
    // Increment theta (try different values for 
    // 'angular velocity' here)
    this.theta += 0.03;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x)*this.amplitude;
      x+=this.dx;
    }
  }
  
  this.renderWave = function (rad) {
    translate(width/2, -height/4);
    noStroke();
    fill(0);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      ellipse(x*xspacing, height/2+yvalues[x], rad, rad);
    }
  }
}