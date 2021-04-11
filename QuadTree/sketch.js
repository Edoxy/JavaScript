let particles = [];

function setup(){
    createCanvas(1100, 789);
    for(let i = 0; i < 5000; i++){
        particles[i] = new Particle(random(width), random(height));
    }
}

function draw()
{
    let boundry = new Rectangle(width/2, height/2, width, height);
    let qtree = new QuadTree(boundry, 4);

    background(0);
    for (let p of particles){
        let point = new Point(p.x, p.y, p);
        qtree.insert(point);
        p.move();
        p.render();
        p.setHighlight(false);
    }

    for (let p of particles)
    {
        if (p.highlight){
            break;
        }
        let range = new Rectangle(p.x, p.y, p.r * 2, p.r * 2);
        let points = qtree.query(range);
        
        for (let point of points){
            let other = point.userData;
            if(other !== p && p.intersects(other))
            {
                p.setHighlight(true);
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