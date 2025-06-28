/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

let NUM_OF_PARTICLES = 50; // Decide the initial number of particles.

let particles = [];

let bubble;

let port;
let connectBtn;
let str; //string from arduino
let val; // array with sensor values

function preload() {
  bubble = loadSound("pop.mp3");
}

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");


  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
    if (val[2] > 250) {
      dancer.triggerP()
    }
  }

   // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
    p.checkOnScreen();
    } 

  for(let i = particles.length-1; i >= 0; i--){
    if (particles[i].onScreen == false) {
      particles.splice(i, 1);
    }
  }

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(5, 40);
    this.yParticleSpeed = random(-1, -5);
    this.noiseArcGoal = random(50, 80);
    this.sinRandomValue = random(-100, 100)
    this.rotateAngle = 1;
    this.onScreen = true;
  
  }
  // methods (functions): particle's behaviors
  update() {
    // (add)
    this.y += this.yParticleSpeed;
    this.sinValue = sin(frameCount*0.01) * this.sinRandomValue;

    console.log(this.y);

    this.rotateAngle++;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x+this.sinValue, this.y);
    rotate(this.rotateAngle*0.2);

    // BUBBLE SHAPE
    strokeWeight(1);
    stroke(255);
    fill(179, 232, 255, 75);
    circle(0,0, this.dia);

    // INSIDE OF BUBBLE
    strokeWeight(random(1, 3));
    strokeCap(ROUND);
    fill(0, 0, 0, 0);
    arc(0, 0, this.dia-10, this.dia-10, 0, this.noiseArcGoal, OPEN);

    pop();
  }
  checkOnScreen() {
    if (this.y < -20) {
      this.onScreen = false;
    }
  }
}


function keyPressed(){
  if(key == "p"){
        for (let i = 0; i < NUM_OF_PARTICLES; i++) {
      particles.push(new Particle(random(width), height));
    }
  }
}
