let confettis = [];
let numConfettis = 1;
let bgHue = 0;

let confettiHue = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // for (i = 0; i < numConfettis; i++) {
  //   confettis.push(new Confetti(width/2, height/2));
  // }

  colorMode(HSB); // HUE SATURATION BRIGHTNESS
  bgHue = random(255);
}

function draw() {
  background(bgHue, 20, 40);

  //  confettis.push(new Confetti(width/2, height/2));

  if (mouseIsPressed == true) {
        for (i = 0; i < numConfettis; i++) {
    confettis.push(new Confetti(mouseX, mouseY));
  }
  }

  // loops over the array to update/display/check if its on screen
  for(let i = 0; i < confettis.length; i++){

    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOnScreen();
  }

  fill(255);
  text(confettis.length, 20, 20);

  // if (confettis.length > 40) {
  //   confettis.splice(0, 1);
  // }


  // don't allow array to exceed 250
  while(confettis.length > 250) {
    confettis.splice(0, 1);
  }
  
  // loop over array & if confetti is not on screen, remove first index
  for(let i = confettis.length-1; i >= 0; i--){
    if (confettis[i].onScreen == false) {
      confettis.splice(i, 1);
    }
  }
  
}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    this.c = color(random(360), 255, 255)
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3); 
    
    this.onScreen = true;
  }
  update(){
    this.x+=this.speedX;
    this.speedX *= 0.99


    this.y+=this.speedY;
    this.speedY += 0.1;
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
  checkOnScreen() {
    if (this.y > height+10) {
      this.onScreen = false;
    }
  }

}

function mousePressed() {
  //   for (i = 0; i < numConfettis; i++) {
  //   confettis.push(new Confetti(mouseX, mouseY));
  // }
}