const colors = {	pink: "#FF377B", beige: "#FEFEDD", lightgrey: "#F9F6EF"}
const margin = 0;
let shapes;
let seed = 0;
let isPlaying;
let frSlider, varSlider, nSlider, sclSlider, shapeSlider, diaSliderL, diaSliderR;

setup = () => {
	createCanvas(windowWidth, windowHeight);
	isPlaying = true;

	shapes = [POINTS, LINES, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, QUADS, QUAD_STRIP]

	// sliders
	frSlider = createSlider(0, 40, 20);
	varSlider = createSlider(0, 200, 3);
	nSlider = createSlider(0, 2000, 300);
	sclSlider = createSlider(0, 50, 20);
	shapeSlider = createSlider(0, shapes.length, 2)
	diaSliderL = createSlider(0, 200, 100);
	diaSliderR = createSlider(0, 200, 100);
	
	frSlider.position(20, 20);
	varSlider.position(20, 50);
	nSlider.position(20, 80);
	sclSlider.position(20, 110);
	shapeSlider.position(20, 140)
	diaSliderL.position(20, 170)
	diaSliderR.position(20, 200)

}

draw = () => {
	background(colors.pink)
  text('frame rate', frSlider.x * 2 + frSlider.width, 30);
  text('heigth variance', varSlider.x * 2 + varSlider.width, 60);
  text('number of partitions', nSlider.x * 2 + nSlider.width, 90);
  text('vertical scale', sclSlider.x * 2 + sclSlider.width, 120);
  text('shape type', shapeSlider.x * 2 + shapeSlider.width, 150);
  text('diagonalism left', diaSliderL.x * 2 + diaSliderL.width, 180);
  text('diagonalism right', diaSliderR.x * 2 + diaSliderR.width, 210);
	
	frameRate(frSlider.value());
	
	for (let i = 1; i < sclSlider.value(); i++) {
		noiseSeed(seed)
		drawLine(
			margin, 
			i*height/sclSlider.value()*diaSliderL.value()*0.01, 
			width-margin, 
			i*height/sclSlider.value()*diaSliderR.value()*0.01, 
			nSlider.value(), 
			varSlider.value())
		seed ++;
	}
}

// picks over / under at random
drawLine = (x1, y1, x2, y2, n = 100, variance = 3) => {
	noFill();
	beginShape(shapes[shapeSlider.value()]);
	vertex(x1, y1);
	let r;
	for (let i = 1; i < n; i += Math.floor(random(variance))){
		// r = 1 - map(noise(i/100), 0, 1, -1, 1)
		r = noise(i)
		// console.log(r)
		vertex( x1 + i*(x2-x1)/n, (y1 + (i-1)*(y2-y1)/n) + variance * noise(i/100) * random([1, -1]))
		// bezierVertex(80, 0, 80, 75, 30, 75);
	}
	vertex(x2, y2);
	endShape();
}

/*
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
*/