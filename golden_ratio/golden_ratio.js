const r = 10;
const pi = Math.PI;
const inc = 0.1;
const scl = 30;
let size = 10;

let x = 1;
let y = 20;
let c;




let ROUND = (x/y);

let balls = [];

let R, G, B = 0;
let yellow, black;

function setup (){

    yellow = color(255,255,0);
    black = color(R,G,B);
    createCanvas(600,600);
    

    for (let j = 0; j < size; j++){
        balls.push([]);
        for ( let i = 0; i < 1/ROUND; i++){
            let ball = new Ball();
            balls[j].push(ball);
        }
    }
}   


function draw () {
    background(0);

    ROUND = (x/y);

    for (let j = 0; j < size; j++){
        for ( let i = 0; i < 1/ROUND; i++){
            c = i*ROUND*2*pi;
//          console.log("COS", cos(c), "SIN", sin(c))
//          translate(j*cos(c), j*sin(c));
//          ellipse(width/2, height/2, r, r);
//          console.log("BALL nr.", j, i, ":", balls[j][i]);
/*
            balls[j][i].x = 10*j*cos(c);
            balls[j][i].y = 10*j*sin(c);
*/
            balls[j][i].update(scl*j*cos(c), scl*j*sin(c))
        }
    }

    console.log("x / y", ROUND);

    if ( ROUND + inc >= 1 ) {
        console.log("DONE");
        noLoop();   
    }
    
    x += inc;
}

function Ball () {

    this.x = x;
    this.y = y;

    this.update = function(x, y){
        //this.render(black);
        this.x = x;
        this.y = y;
        this.render(yellow);
    }

    this.render = function (color) {
        push();
        translate(this.x, this.y);
        fill(color);
        ellipse(width/2, height/2, r, r);
        pop();
    }
}