class Wave {
  constructor(amp, period, phase){
    this.amplitude = amp;
    this.period = period;
    this.phase = phase;
  }

  evaluate(x) {
    return sin(x * TWO_PI/this.period + this.phase) * this.amplitude
  }

  update() {
    this.phase += 0.02
    if(abs(this.phase - TWO_PI) < 0.01 ) {
      this.phase = 0;
    }
    return
  }
}

let waves = [];

function setup() {
  createCanvas(1200, 800);
  for (let i = 0; i < 20; i++) {
    waves[i] = new Wave(random(10, 120), random(100, 2000), random(0, TWO_PI))
  }
}

let hue = 0;

function draw() {
  background(0);
  if( hue == 100){
    hue = 0;
  }
  
  for (let x = 0; x < width; x += 2) {

    colorMode(HSL, 100)
    let c = color(hue, 80, 55);
    fill(c)
    let y = 0;
    for(let wave of waves){
      y += wave.evaluate(x)
    }
    //noStroke()
    ellipse(x, y + height/2, 5)
  }
  hue += 0.1
  for(let wave of waves) {
    wave.update()
    
  }
}
