let time = 0;
let trace = [];
let waves = [];
let y = [];
let FourierY;
//wave class
class Wave {
    constructor(amp, freq, phase) {
        this.amplitude = amp;
        this.freq = freq;
        this.phase = phase;
    }

    evaluate(x) {
        return sin(x * this.freq + this.phase) * this.amplitude
    }
}
//function that compute the discrete fourier transform
function dft(x) {
    let X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;

        for (let n = 0; n < N; n++) {
            let phi = (TWO_PI * k * n) / N
            re += x[n] * cos(phi)
            im -= x[n] * sin(phi)
        }
        re = re /  N;
        im = im / N;

        let freq = k * TWO_PI / N;
        let amp = sqrt(re * re + im * im);
        let phase = atan2(im, re)

        X[k] = { re, im, freq, amp, phase };
    }

    return X;
}

let signal = y;

const SCALE = 0.5;
const MAX_F = 0.12;
const MIN_F = 0.005;
let MAX_P;
let f = [];

function setup() {
    createCanvas(1200, 1200);
    const N = 4
    //Creation on signal to process:
    //creation of N waves
    for (let i = 0; i < N; i++) {
        //strore the frequency
        f[i] = 1 /round(random(MIN_F, MAX_F), 2);
        //create the wave object randomly
        waves[i] = new Wave(random(10, 70), 1 / f[i], random(0, TWO_PI));
    }

    //calculating the maximum distance of one period
    MAX_P =abs( TWO_PI  /MIN_F);

    for (let i = 0; i < MAX_P; i++) {
        //calculating the signal value
        y[i] = waves[0].evaluate(i);
        for (let j = 1; j < waves.length; j++) {
            //summing all the waves together
            y[i] += waves[j].evaluate(i);
        }
    }
    //calculating the fourier transform of the signal
    FourierY = dft(y);

}

function draw() {
    background(0);
    //move the origin to an other location
    translate(200, 200);
    stroke(255, 204, 0);

    //draws the frequency value the we calculate with the transform
    beginShape();
    for (let i = 0; i < FourierY.length * MAX_F / TWO_PI; i++) {
        vertex(FourierY[i].freq * SCALE * MAX_P / MAX_F, - FourierY[i].amp * 10 + 900);
    }
    endShape();

    //Draws the original signal
    stroke('rgb(0,255,0)');
    beginShape();
    for (let i = 0; i < signal.length; i++) {
        vertex(i * SCALE, signal[i] + 400);
    }
    endShape();

    //Draws the circles
    let x = 0;
    y = 0;

    for (let i = 0; i < FourierY.length/2; i++) {
        let prevx = x;
        let prevy = y;

        let freq = FourierY[i].freq;
        let radius = FourierY[i].amp * 2;
        let phase = FourierY[i].phase + HALF_PI;

        stroke(255, 60);
        noFill();
        ellipse(prevx, prevy, radius * 2);

        x += radius * cos(freq * time + phase);
        y += radius * sin(freq * time + phase);

        fill(255);
        stroke('orange');
        line(prevx, prevy, x, y)
        //ellipse(x, y, 4)

    }
    //stores the y position to draw the resulting wave
    trace.unshift(y)

    stroke('red');

    beginShape();
    noFill();
    let shift = 300
    for (let i = 0; i < trace.length; i++) {
        vertex(i * SCALE + shift, trace[i]);
    }
    endShape();

    stroke(255);
    line(x, y, shift, y)
    ellipse(shift, y, 4)

    const dt = 1
    time -= dt

    //Reduce the lentgth of the trace array to 500
    if (trace.length > 600) {
        trace.pop()
    }
}
