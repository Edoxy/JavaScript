let time = 0
let wave = []

function setup() {
    createCanvas(1000, 400);
}

function draw() {
    background(0);
    translate(200, 200)
    let x = 0;
    let y = 0;


    let n = 2 * 0 + 1
    //let n = i+1
    let radius = 100 * 4 / (n * PI * (1) ** n)

    stroke(255, 100);
    noFill();
    ellipse(x, y, radius * 2);

    x += radius * cos(n * time);
    y += radius * sin(n * time);

    fill(255);
    stroke(255);
    line(0, 0, x, y)
    //ellipse(x, y, 4)


    wave.unshift(y)

    beginShape();
    noFill();
    let shift = 300
    for (let i = 0; i < wave.length; i++) {

        vertex(i + shift, wave[i]);

    }
    endShape();
    line(x, y, shift, y)
    ellipse(shift, y, 4)

    time -= 0.01

    if (wave.length > 500) {
        wave.pop()
    }

}
