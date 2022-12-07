class Snake {
  constructor(id, rgb, leftKey, rightKey) {
    this.id = id
    this.color = rgb;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.pos = createVector(random(100,size-100), random(100,size-100));
    this.angle = random(0,360);
    this.vel = p5.Vector.fromAngle(radians(this.angle), speed);
    this.size = 5;
    this.alive = true;

    // Create a 2D grid to trace where the snake has been
    let grid = new Array(size);
    // Loop to create 2D array using 1D array
    for (var i = 0; i < size; i++) {
      grid[i] = new Array(size);
    }
    // Loop to initialize 2D array elements.
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        grid[i][j] = 0;
      }
    }
    this.traceGrid = grid;
    this.lastX = Math.floor(this.pos.x);
    this.lastY = Math.floor(this.pos.y);
    this.traceGrid[this.lastX][this.lastY] = 1;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.rotate(0);
  }

  checkEdges() {
    if ((this.pos.x < 0) || (this.pos.x > size) || (this.pos.y < 0) || (this.pos.y > size)) {
      this.alive = false;
    } 
  }

  checkTrace() {
    let x = Math.floor(this.pos.x);
    let y = Math.floor(this.pos.y);
    if (this.traceGrid[x][y] == 1) {
      if ((x == this.lastX) && (y == this.lastY)) {
      } else {
        this.alive = false;
        console.log("Game over")
      }
  } else {
      this.traceGrid[x][y] = 1;
      this.lastX = x;
      this.lastY = y;
    }
  }

  checkCollision(other) {
    let x = Math.floor(this.pos.x);
    let y = Math.floor(this.pos.y);
    if (other.traceGrid[x][y] == 1) {
      this.alive = false;
      console.log("Game over")
      }
  }
  
  getSteeringInput() {
    if (keyIsDown(this.leftKey)){
      this.turnLeft();
    } else if (keyIsDown(this.rightKey)){
      this.turnRight();
    } else {
        // do nothing
    }
  }

  turnLeft() {
    this.angle -= 2*speed;
    this.vel = p5.Vector.fromAngle(radians(this.angle), speed);
  }

  turnRight() {
    this.angle += 2*speed;
    this.vel = p5.Vector.fromAngle(radians(this.angle), speed);
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}