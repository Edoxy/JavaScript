function Collaz(n){
  let a, b;
  if (n > 0)
  {
    a = 2 * n;
    b = (n - 1)/3;

    if (b % 1 != 0 || b <= 0 ){
      return [a];
    }
    
    return [a, b];
  }
}

function setup() {
  createCanvas(400, 400);
  var list = Collaz(1);

  for (let i = 0; i < 10; i++){

    let x = [];
    for (let j = 0; j < list.length; j++){

      let v = Collaz(list[j]);
      v.forEach(element => {
        x.push(element);
      });

    }

    print(list);

    list = x;
  }
}

function draw() {
  background(220);
}

