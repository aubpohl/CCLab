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

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AubreyDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AubreyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    this.armSpeed = 2;
    this.yArmOffset = 0;
    this.yOffset = 0;
    this.headOffset = 0;
    this.maracaOffset = 0;
    this.xOffset = 0;
    //..

    this.scale = 1;
    this.scaleGoal = this.scale;
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    // this.updatedScale = 0.1;
    this.maracaOffset = noise(frameCount*1000) * 5
    this.headOffset = cos(frameCount*0.3) / 9;
    this.yOffset = sin(frameCount*0.1) * 4;
    this.yArmOffset = sin(frameCount*0.1) * this.armSpeed;

    this.scale = lerp(this.scale, this.scaleGoal, 0.1)

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    scale(this.scale)
    console.log(this.scale);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

    // LEGS
    strokeWeight(7)
    stroke(247, 193, 77)

    // LEFT LEG
    push();
    translate(-33, 70);
    line(0, 0, 0, 25);
    pop();

    // RIGHT LEG
    push();
    translate(33, 70);
    line(0, 0, 0, 25);
    pop();

    ////////////////////
    ////////////////////
    ////////////////////

    push();
    translate(0, 0+this.yOffset);
      push();
      fill(247, 193, 77); // YELLOW COLOR
      stroke(0);

      // TAIL
      push();
      translate(35+this.yOffset, 55+this.yOffset);
      ellipse(0, 0, 25, 15);
      pop();

      // BODY
      strokeWeight(1);
      rect(-38, 0, 75, 75);

      strokeWeight(7)
      stroke(247, 193, 77)

      ////////////////////
      ////////////////////
      ////////////////////

      // LEFT ARM
      push();
      translate(-30, 8);
      line(0, 0, -30, 5 + this.yArmOffset);

      push();
      translate(30, -5 + this.yArmOffset);
        push();
        // MARACA ARM 1
        strokeWeight(5);
        stroke(201, 160, 105);
        line(-60, 8, -65, -8); // change x2/y2 to noise value

        // MARACA RED ELLIPSE 1
        noStroke();
        fill(209, 79, 65);
        push();
          translate(-66, -12);
          rotate(-10);
          ellipse(this.maracaOffset - 3, this.maracaOffset - 3 , 15, 20);
        pop();
        pop();
      pop();
      pop();

      // RIGHT ARM
      push();
      translate(30, 8);
      line(0, 0, 30, 5 + this.yArmOffset);

      push();
      translate(-30, -5 + this.yArmOffset);
        // MARACA ARM 2
        push();
        strokeWeight(5);
        stroke(201, 160, 105);
        line(60, 8, 65, -8); // change x2/y2 to noise value

        // MARACA RED ELLIPSE 2
        noStroke();
        fill(209, 79, 65);
        push();
          translate(66, -12);
          rotate(10);
          ellipse(this.maracaOffset - 3, this.maracaOffset - 2, 15, 20);
        pop();
        pop();
      pop();
      pop();

      ////////////////////
      ////////////////////
      ////////////////////

      push();
      translate(0, 0+this.yOffset);
      rotate(this.headOffset);
        // EARS
        strokeWeight(1)
        stroke(0);
        circle(35, -65, 25);
        circle(-35, -65, 25);

        fill(0);
        rect(42, -75, 10, 40);
        rect(-52, -75, 10, 40);

        // HEAD
        fill(247, 193, 77);
        circle(0, -30, 100);

        // FACE
        // SMILE
        fill(0);
        arc(0, -20, 20, 50 + this.yOffset*3, 120, PI * QUARTER_PI, CHORD)

        fill(247, 193, 77);
        noStroke();
        circle(-7, -19, 20);
        circle(7, -19, 20);

        // EYES
        fill(0);
        circle(-20, -30, 10);
        circle(20, -30, 10);
        fill(247, 193, 77);
        rect(-25, -28, 70, 10);
      pop();

      ////////////////////
      ////////////////////
      ////////////////////

    pop();

    ////////////////////
    ////////////////////
    ////////////////////

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes()

    pop();
  }
  triggerA(){
    // this function will be called when the "a" key is pressed.
    // your dancer should perform some kind of reaction (i.e. make a special move or gesture) 

    // CHANGE ARM SPEED
    this.armSpeed += 5;
    if (this.armSpeed >= 20) {
      this.armSpeed = 20;
    }

  }
  triggerD(){
    // this function will be called when the "d" key is pressed.
    // your dancer should perform some kind of reaction (i.e. make a special move or gesture) 

    this.scaleGoal = random(0.5, 1.5);

  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    // line(-5, 0, 5, 0);
    // line(0, -5, 0, 5);
    stroke(255);
    // rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/

/*
Here are the key events that your dancer should react to in some way.
*/

function keyPressed(){
  if(key == "a"){
    dancer.triggerA()
  }else if(key == "d"){
    dancer.triggerD()
  }
}