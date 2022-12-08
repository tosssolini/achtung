class Snake {
  constructor(id, rgb, leftKey, rightKey) {
    this.id = id
    this.color = rgb;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.pos = createVector(random(xlim[0],xlim[1]), random(ylim[0],ylim[1]));
    this.angle = random(0,360);
    this.vel = p5.Vector.fromAngle(radians(this.angle), speed);
    this.size = 5;
    this.alive = true;
    this.score = 0;
    this.gapTime = 0;
    this.gapFlag = 0;

    // Create a 2D grid to trace where the snake has been
    let grid = new Array(xlim[1]);
    // Loop to create 2D array using 1D array
    for (var i = 0; i < xlim[1]; i++) {
      grid[i] = new Array(ylim[1]);
    }
    // Loop to initialize 2D array elements.
    for (var i = 0; i < xlim[1]; i++) {
      for (var j = 0; j < ylim[1]; j++) {
        grid[i][j] = 0;
      }
    }
    this.traceGrid = grid;
    this.lastX = Math.floor(this.pos.x);
    this.lastY = Math.floor(this.pos.y);
    this.traceGrid[this.lastX][this.lastY] = 1;
  }

  update() {
    if (this.alive) {
      this.pos.add(this.vel);
      this.vel.rotate(0);
    }
  }

  checkEdges() {
    if ((this.pos.x <= xlim[0]) || (this.pos.x >= xlim[1]) || (this.pos.y <= ylim[0]) || (this.pos.y >= ylim[1])) {
      this.alive = false;
    } 
  }

  checkTrace() {
    let x = Math.floor(this.pos.x);
    let y = Math.floor(this.pos.y);
    x = this.checkBuffer(x)
    y = this.checkBuffer(y)
    if (this.traceGrid[x][y] == 1) {
      if ((x == this.lastX) && (y == this.lastY)) {
      } else {
        this.alive = false;
      }
  } else {
      if (this.gapFlag == 1) {
        this.traceGrid[x][y] = 1;
        this.lastX = x;
        this.lastY = y;
      }
    }
  }

  checkCollision(other) {
    let x = Math.floor(this.pos.x);
    let y = Math.floor(this.pos.y);
    x = this.checkBuffer(x)
    y = this.checkBuffer(y)
    if (other.traceGrid[x][y] == 1) {
      this.alive = false;
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

  addScore(other) {
    if (other.alive == true) {
      other.score += 1;
    }
  }

  checkBuffer(x) {
    if (x < xlim[0]){
      x = xlim[0];
    }
    if (x > xlim[1]-1){
      x = xlim[1]-1;
    }
    return x
  } 

  reset() {
    this.alive = true;
    this.pos = createVector(random(xlim[0],xlim[1]), random(ylim[0],ylim[1]));
    this.angle = random(0,360);
    this.vel = p5.Vector.fromAngle(radians(this.angle), speed);
    for (var i = 0; i < xlim[1]; i++) {
      for (var j = 0; j < ylim[1]; j++) {
        this.traceGrid[i][j] = 0;
      }
    }
  }

  gapManager() {
    if (this.gapTime >= 0) {
      this.gapTime -= 1;
    } else {
      if (this.gapFlag == 0) {
        this.gapTime = random(120,240);
        this.gapFlag = 1;
      } else if (this.gapFlag == 1) {
        this.gapTime = random(10,20);
        this.gapFlag = 0;
      }
    }
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2]);
    if (this.gapFlag == 1) {
      ellipse(this.pos.x, this.pos.y, this.size);
    }
  }
}

