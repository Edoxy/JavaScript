class Particle {
    constructor(x, y, dir) {
        this.x = x;
        this.y = y;
        //this.speed = new Point(cos(dir), sin(dir));
        this.dir = dir
        this.r = 1.5;
        this.highlight = false;
    }

    move(){
        this.x += cos(this.dir);
        this.y += sin(this.dir);
    }

    intersects(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return (d < this.r + other.r);
    }

    setHighlight(value) {
        this.highlight = value;
    }

    border(range) {
        this.dir = this.dir % TWO_PI;
        let toll = 2;
        if (abs(this.x - (range.x - range.w)) < toll) {
            //console.log('left');
            this.dir = (PI - this.dir);
            this.highlight = true;

        } else if (abs(this.x - (range.x + range.w)) < toll) {
            //console.log('right');
            this.dir = (0 - this.dir) - PI;
            this.highlight = true;

        } else if (abs(this.y - (range.y + range.h)) < toll) {
            //console.log('down');
            this.dir = (3 * HALF_PI - this.dir) + HALF_PI;
            this.highlight = true;

        } else if (abs(this.y - (range.y - range.h)) < toll) {
            //console.log('up');
            this.dir = (HALF_PI - this.dir) + (3 *HALF_PI);
            this.highlight = true;

        }
    }

    render() {
        noStroke();
        if (this.highlight) {
            colorMode(HSL)
            fill(random(100), 100, 50);
        } else {
            colorMode(RGB);
            fill(80);
        }
        ellipse(this.x, this.y, this.r * 2);
    }
}