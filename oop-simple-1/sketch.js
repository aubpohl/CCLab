let dino;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  dino = new Dinosaur(100, 300);
  dino2 = new Dinosaur(300, 100);
}

function draw() {
  background(220);

  dino.display();
  dino2.display();
}

class Dinosaur {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.type = random(["flying", "trex"]); 
    this.col = color(255, random(255), 120);
    this.age = 0;
  }

  display() {
    push();
    translate(this.x, this.y);

    fill(this.col);

    if (this.type == "trex") {
    rect(-30, -30, 60, 60);
    fill(0);
    text("trex", 0, 0);
    } else if (this.type == "flying") {
    ellipse(0, 0, 60, 40);
    fill(0);
    text("flying", 0, 0);
    }


    fill("red");
    circle(0, 0, 5);

    pop();
  }
}