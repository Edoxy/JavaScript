let qt;

function setup() {
  createCanvas(1000, 700);

  let boundry = new Rectangle(width/2, height/2,width/2, height/2);
  qt = new QuadTree(boundry, 4);
  console.log(qt);

  for (let i = 0; i < 1000; i++)
  {
    let p = new Point(random(width), random(height));
    qt.insert(p);
  }

}

function draw() {
  background(0);
  qt.show();

  stroke(0, 255, 0);
  rectMode(CENTER);

  let range = new Rectangle(mouseX, mouseY, 50, 50);
  rect(range.x, range.y, range.w * 2, range.h * 2);

  let points = qt.query(range);
  for (let p of points)
  {
    strokeWeight(4);
    point(p.x, p.y);
  }

}
