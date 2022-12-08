// Zatacka replica with p5.js
// Author: Øyvind Torgersrud

let font;
let gameData;
let size;
let fps;
let maxPlayers;
let speed;
let snakes = [];
let xlim;
let ylim;
let screenState = 0;
let winner;

function preload() {
  font = loadFont('codegon.ttf')
  gameData = loadJSON('game_data.json')
}

function keyPressed() {
  if (keyCode === ENTER) {
    screenState += 1;
    background(0);
  }
}

function setup() 
{
  size = gameData["settings"]["size"];
  fps = gameData["settings"]["fps"];
  maxPlayers = gameData["settings"]["maxPlayers"];
  speed = gameData["settings"]["speed"];
  xlim = [0, size * 1.2];
  ylim = [0, size];
  createCanvas(size*1.4, size);
  frameRate(fps)
  background(0);

  
  // Add players to game (TODO based on user input)
  for (var i = 0; i < maxPlayers; i++) {
    id = gameData["players"][i]["id"];
    rgb = gameData["players"][i]["rgb"];
    leftKey = gameData["players"][i]["left"]["code"];
    rightKey = gameData["players"][i]["right"]["code"];
    snakes[i] = new Snake(id, rgb, leftKey, rightKey);
  }
}

function draw()
{  

  if (screenState == 0) {
    // Just the achtung welcome screen
    fill(255)
    .strokeWeight(0)
    .textSize(30);
    textFont(font);
    textAlign(CENTER);
    text('Achtung die Kurve!', width / 2, height / 2);

  } else if (screenState == 1) {
    
    // Screen to select players
    for (let i = 0; i<maxPlayers; i++) {
      let id = gameData["players"][i]["id"];
      let left = gameData["players"][i]["left"]["key"];
      let right = gameData["players"][i]["right"]["key"];
      let rgb = gameData["players"][i]["rgb"];
      fill(rgb)
      .strokeWeight(0)
      .textSize(30);
      textFont(font);
      textAlign(LEFT);
      text('Player ' + id + ":  " + left + "  " + right, width / 6, height*(i+2) / 10);
    }

  } else if (screenState == 2) {
    // Points screen
    stroke(255);
    fill(0);
    strokeWeight(3);
    rect(xlim[1], ylim[0], xlim[1], ylim[1])
    for (let i = 0; i<maxPlayers; i++) {
      let rgb = gameData["players"][i]["rgb"];
      fill(rgb)
      .strokeWeight(0)
      .textSize(60);
      textFont(font);
      textAlign(CENTER);
      text(snakes[i].score, size*1.3, height*(i+1) / 6);
    }

    // Game loop 
    alive = 0;
    for (s of snakes) {
      if (s.alive == true) {
        alive += 1;
        s.getSteeringInput();
        s.update();
        s.checkEdges();
        s.checkTrace();
        for (other of snakes) {
          if (other != s) {
            s.checkCollision(other);
          }
        }
        s.show();
        if (s.alive == false) {
          for (other of snakes) {
            if (other != s) {
              s.addScore(other);
            }
          }
        }
      }
    }
    
    if (alive == 0) {
      screenState = 3;
    }

  } else if (screenState == 3) {
    fill(255)
    .strokeWeight(0)
    .textSize(30);
    textFont(font);
    textAlign(CENTER);
    text('Press Enter to continue', width / 2, height / 2);

  } else if (screenState == 4) {
    for (s of snakes){
      s.reset();
      if (s.score >= (maxPlayers - 1) * 10){
        winner = s.id;
        screenState = 5
      } else {
        screenState = 2;
      }
    }
  } else if (screenState == 5) {
    fill(255)
    .strokeWeight(0)
    .textSize(30);
    textFont(font);
    textAlign(CENTER);
    text('Konec Hry', width / 2, height / 3);
    text('Press enter to play again', width / 2, height * 2 / 3);
  } else if (screenState == 6) {
      screenState = 0;
      for (s of snakes){
        s.score = 0;
      }
  }
}
