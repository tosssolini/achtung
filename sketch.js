// Zatacka replica with p5.js
// Author: Øyvind Torgersrud

let size = 1000;
let fps = 60;
let speed = 1;
let numberOfPlayers = 6;
let snakes = [];

const players = [
    {
      player: 1,
      color: [255,15,15] // red
    },
    {
      player: 2,
      color: [255,255,0]  // yellow
    },
    {
      player: 3,
      color: [255,165,0]  // orange
    },
    {
      player: 4,
      color: [0,255,0]  // green
    },
    {
      player: 5,
      color: [255,131,250]  // orchid
    },
    {
      player: 6,
      color: [0,245,255]  // turquoise
    }
]

function setup() 
{
    createCanvas(size*1.6, size);
    frameRate(fps)
    background(0);
    
    for (var i = 0; i < numberOfPlayers; i++) {
        let id = i+1;
        snakes[i] = new Snake(players[i].player, players[i].color);
    }

}

function draw()
{   
    for (s of snakes) {
        s.update();
        s.checkEdges();
        s.checkTrace();
        for (other of snakes) {
            if (other != s) {
                s.checkCollision(other);
            }
        }
        s.keyPressed();
        s.show();// code block to be executed

        if (s.alive == false) {
            console.log("Game over")
            exit()
        }
    }
}
