let particles = [];
let boundry;
let toll = 4;
let border = [];

function setup(){
    createCanvas(1200, 789);
    boundry = new Rectangle(width/2, height/2, width/2, height/2);
    border[0] = new Rectangle(width/2, 0, width/2, toll);
    border[1] = new Rectangle(width, height/2, toll, height/2);
    border[2] = new Rectangle(width/2, height, width/2, toll);
    border[3] = new Rectangle(0, height/2, toll, height/2);

    for(let i = 0; i < 5000; i++){
        particles[i] = new Particle(random(width), random(height), random(TWO_PI));
    }
}




function draw()
{
    let qtree = new QuadTree(boundry, 7);

    background(0);
    for (let p of particles){
        let point = new Point(p.x, p.y, p);
        qtree.insert(point);
        p.border(boundry);
        p.move();
        p.render();
        p.setHighlight(false);
    }

    // for (let b of border){
    //     let near = qtree.query(b);
    //     for(let n of near){
    //         let part = n.userData
    //         part.border(boundry);
    //     }
    // }

    for (let p of particles)
    {
        if (p.highlight){
            continue;
        }
        let range = new Rectangle(p.x, p.y, p.r * 1.5, p.r * 1.5);
        let points = qtree.query(range);
        
        for (let point of points){
            let other = point.userData;
            if(other !== p && p.intersects(other))
            {
                p.setHighlight(true);
                other.setHighlight(true);
                // let tmp = p.dir;
                // p.dir = other.dir;
                // other.dir = tmp;
            }
        }
    }


    // for (let p of particles){
    //     for (let other of particles){
    //         if ( p !== other && p.intersects(other))
    //         {
    //             p.setHighlight(true);
    //         }
    //     }
    // }
}