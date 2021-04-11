class Point{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return (point.x > this.x - this.w &&
            point.x < this.x + this.w &&
            point.y > this.y - this.h &&
            point.y < this.y + this.h);
    }

    intersect(range){
        return !(range.x - range.w > this.x + this.w ||
                range.x + range.w < this.x - this.w ||
                range.y + range.h < this.y - this.h ||
                range.y - range.h > this.y + this.h);
    }
}

class QuadTree{
    constructor(boundry, capacity){
        this.boundry = boundry;
        this.capacity = capacity;
        this.points = [];
        this.devided = false;
    }

    subdivide()
    {
        let n_w = this.boundry.w/2;
        let n_h = this.boundry.h/2;
        let x = this.boundry.x;
        let y = this.boundry.y;

        let ne = new Rectangle(x + n_w, y - n_h, n_w, n_h);
        let nw = new Rectangle(x - n_w, y - n_h, n_w, n_h);
        let se = new Rectangle(x + n_w, y + n_h, n_w, n_h);
        let sw = new Rectangle(x - n_w, y + n_h, n_w, n_h);
        this.northwest = new QuadTree(nw, this.capacity);
        this.northest = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southest = new QuadTree(se, this.capacity);

        this.devided = true;
    }

    insert(point)
    {
        //stops if the point is not in this quad
        if(!this.boundry.contains(point))
        {
            return;
        }

        if(this.points.length < this.capacity)
        {
            this.points.push(point);
        }else{
            if (!this.devided)
            {
                this.subdivide();
            }
            this.northest.insert(point);
            this.southwest.insert(point);
            this.southwest.insert(point);
            this.southest.insert(point);

        }
    }

    query(range, found){

        if (!this.boundry.intersect(range))
        {
            return;
        }else{
            for(let p of  this.points)
            {
                if (range.contains(p))
                {
                    found.push(p);
                }
            }

            if (this.devided)
            {
                this.northest.query(range, found);
                this.northwest.query(range, found);
                this.southest.query(range, found);
                this.southwest.query(range, found);
            }

            return;
        }

    }

    show(){
        strokeWeight(1);
        stroke(255);
        noFill();
        rectMode(CENTER);
        rect(this.boundry.x, this.boundry.y, this.boundry.w * 2, this.boundry.h * 2);
        if(this.devided)
        {
            this.northest.show();
            this.northwest.show();
            this.southest.show();
            this.southwest.show();
        }
        for (let p of this.points)
        {
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}