const scl = 150;
const thresh = 300;

let offset = 0;
let xoff = 0.0
let yoff = 0.0;
let factor = 1;

let cols, rows;
let isPlaying = true;

let c = 0;

const colors = {	pink: "#FF377B", beige: "#FEFEDD", lightgrey: "#F9F6EF"}

setup = () => {
	createCanvas(windowWidth, windowHeight);
	cols = ceil(width / scl);
	rows = ceil(height / scl);
	strokeWeight(2);
}

draw = () => {
	background(colors.lightgrey)
	// drawSquareGrid();
  drawWavyGrid();
}

drawWavyGrid = () => {
	c ++;
	let i; 
	for (i = 0; i <= cols; i ++){
		dx = offset * noise(xoff)
		stroke(0,0,0);
		noFill();
		bezier(i*scl, 0, i*scl + dx, height/4, i*scl - dx, 3*height/4, i*scl, height);
		
		xoff += 0.0001;
	}
	
	// ellipse((i/2)*scl + dx, height/4, 10, 10);
	// ellipse((i/2)*scl + dx, 3*height/4, 10, 10);

	let j;
	for (j = 0; j <= rows; j ++){
		dy = offset * noise(yoff)
		stroke(0,0,0)
		noFill();
		bezier(0, j*scl, width/4, j*scl + dy, 3*width/4, j*scl - dy, width, j*scl);	
		
		yoff += 0.0002;	
	}

	// ellipse(width/4, (j/2)*scl - dy, 10, 10);
	// ellipse(3*width/4, (j/2)*scl - dy, 10, 10);

	// avoiding distortion
	offset += factor
  
	factor > 0
		? factor = map(thresh - Math.abs(offset), 0, 300, 0.03, 1, true)
		: factor = (-1)*map(thresh - Math.abs(offset), 0, 300, 0.03, 1, true)

  

  if (Math.abs(offset) > thresh ) {
  	console.log("OFF", offset)
  	console.log("FAC", factor)
  	factor *= (-1)
  }

  if (c % 100 === 0) { console.log(factor)}

}

drawSquareGrid = () => {
	for (let i  = 0; i <= cols; i ++){
		line(i*scl, 0, i*scl, height);
	}
	for (let j = 0; j <= rows; j ++){
		line(0, j*scl, width, j*scl);	
	}
}


// events
mouseClicked = () => {
	if (isPlaying) {
		noLoop()
		isPlaying = false;
	}
	else {
		loop()
		isPlaying = true;
	}
}