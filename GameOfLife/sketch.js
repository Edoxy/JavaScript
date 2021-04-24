
let resolution = 5;
let cols;
let rows;

let grid;

function make2DArray(rows, cols)
{
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++)
  {
    arr[i] = new Array(rows);
  }
  return arr;
}

function countN(grid, i, j)
{
  //meno uno perhé conta se stesso una volta

  let sum = -grid[i][j];
  for (let m = i-1; m <= i+1; m++){
    for(let n = j-1; n <=j+1; n++){
      if(m < 0 || n < 0 || m > cols-1 || n > rows-1){
        continue;
      }
      sum += grid[m][n];
    }
  }

  return sum;
}

function setup() {
  createCanvas(1100, 800);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(rows, cols);
  for (let i = 0; i < cols; i++)
  {
    for (let j = 0; j < rows; j++)
    {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  let next = make2DArray(rows, cols)

  for (let i = 0; i < cols; i++)
  {
    for (let j = 0; j < rows; j++)
    {
      next[i][j] = 0;

      sum = countN(grid, i, j);

      if (grid[i][j] == 1)
      {
        stroke(i *2, j *2, 150);
        ellipse(i * resolution + resolution/2, j * resolution + resolution/2, resolution-2)

        if (sum >= 2 && sum <= 3){
          next[i][j] = 1;
        }else{
          next[i][j] = 0;
        }
      }else
      {
        if(sum == 3)
        {
          next[i][j] = 1;
        }
      }
    }
  }
  grid = next;
  
}
