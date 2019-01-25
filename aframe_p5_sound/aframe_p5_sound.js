let tune
let fft, spectrum, low, lowMid, mid, highMid, trbl;
const TUNE_PATH = "tune.mp3";
const BACK_COL = "black";
const d = 100;


function setup(){
    if (tune.isLoaded()){
        changeHeader(); // preload makes sure that this happens after loading
    }

    const cnv = createCanvas(windowWidth, windowHeight);
    background(BACK_COL);
    
    cnv.mouseClicked(togglePlay);
    frameRate(30); // don't wanna overheat m8
    fft = new p5.FFT();
    fft.setInput(tune); // if not set, fft analyzes all the sound in the sketch
    

    // console.log("Peaks");
    // console.log(tune.getPeaks());

    
}

function draw(){
    background(BACK_COL);
    spectrum = fft.analyze();
    bass = fft.getEnergy('bass');
    lowMid = fft.getEnergy('lowMid');
    mid = fft.getEnergy('mid');
    highMid = fft.getEnergy('highMid');
    trbl = fft.getEnergy('treble');

    // TODO - detect lowest, highest and avg value and map thereafter
    // now it's only from trial and error
    fill('yellow');

    translate(-(1/2)*((width/5)+d), 0);
    ellipse(1*width/5, height/2, map(bass, 150, 255, 1, d, true), map(bass, 150, 255, 1, d, true));
    ellipse(2*width/5, height/2, map(lowMid, 100, 200, 1, d, true), map(lowMid, 100, 200, 1, d, true));
    ellipse(3*width/5, height/2, map(mid, 0, 100, 1, d, true), map(mid, 0, 100, 1, d, true));
    ellipse(4*width/5, height/2, map(highMid, 0, 40, 1, d, true), map(highMid, 0, 40, 1, d, true));
    ellipse(5*width/5, height/2, map(trbl, 0, 10, 1, d, true), map(trbl, 0, 10, 1, d, true));

    console.log([bass, lowMid, mid, highMid, trbl]);

    
}   

// gets called automatically by p5 to load the song
function preload (){
    soundFormats('mp3');
    tune = loadSound(TUNE_PATH);
}

function togglePlay() {
    tune.isLoaded()
    ? (tune.isPlaying()
        ? tune.pause()
        : tune.play())
    : console.error("Sound hasn't loaded yet");
}

function changeHeader() {
    let header = document.querySelector('#loading');
    header.innerHTML = "Loaded !"
    header.style.display = "none";
}