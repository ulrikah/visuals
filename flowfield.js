let inc = 0.5; // 'better' result for small values, e.g. ~ 0.02 
let scl = 10;
let cols, rows;

let zoff = 0;

function setup(){
	createCanvas(400,400);
	cols = floor(width / scl);
	rows = floor(height / scl);
}

function draw(){
	background(255);
	let yoff = 0;

	
	for (let y = 0; y < rows; y++){
		let xoff = 0;
		for (let x = 0; x < cols; x ++){
			let index = (x + y * width) * 4; //	sjekk tutorial for denne
			let angle = noise(xoff, yoff, zoff) * TWO_PI;
			let v = p5.Vector.fromAngle(angle);
			xoff += inc;

			let noise_red = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
			let noise_green = map(noise(yoff, xoff, zoff), 0, 1, 0, 255);
			let noise_blue = map(noise(zoff, yoff, xoff), 0, 1, 0, 255);

			stroke(noise_red, noise_green, noise_blue);
			push();
			translate(x * scl, y * scl);
			rotate(v.heading());
			line(0, 0, scl, 0);


			pop();
		}

		yoff += inc;

		zoff += 0.001;
	}

	
	

}