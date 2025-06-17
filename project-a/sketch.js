// COLORS FOR REFERENCE:
//
// DARKEST GREEN: (11, 18, 16)
// DARKER GREEN:  (19, 32, 25)
// DARK GREEN:    (30, 59, 45)
// GREEN:         (45, 94, 65)
// LIGHT GREEN:   (94, 153, 89)
// DARK RED:      (70, 29, 33)
// RED:           (169, 88, 71)
// CREAM/WHITE:   (233, 198, 156)
// WHITE:         (236, 222, 195)

// PARALLAX EFFECT
// REFERENCED FROM: https://editor.p5js.org/mparker/sketches/k9cwatrhL
let xParallaxBack;
let yParallaxBack;
let xParallaxFlower;
let yParallaxFlower;

// FOR ROTATE
let rotateAngle = 0;
let flowerRotateAngle = 0;
let petalRotation;

// FOR SCALE
let flowerScale = 1;

// FOR LEAF FUNCTION
let backLeafScale;
let frontLeafScale;
let backLeafRadius;
let frontLeafRadius;
let offset = 5;

// FOR FLOWER FUNCTION
let xFlowerPos;
let yFlowerPos;
let scaleValue;
let sinValue;
let petalSize = 175;
let petalHeight = 0;

// FOR USER INTERACTION
let clickCounter = 1;
let xPosShake = 0;
let yPosShake = 0;

// RGB FOR PETALS
let flowerRed = 169;
let flowerGreen = 88;
let flowerBlue = 71;

// RGB TARGET VALUES
let targetRed;
let targetGreen;
let targetBlue;

// ARRAY FOR PETAL ANGLES
let petalAngles = [];

// SETUP
function setup() {
  // createCanvas(800, 500);
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  angleMode(DEGREES);

  // RANDOMIZE LANDSCAPE
  backLeafScale = random(1.5, 3); // SETS THE SCALE OF LEAVES IN BACK
  frontLeafScale = random(1, 1.4); // SETS THE SCALE OF LEAVES IN FRONT
  backLeafRadius = random(150, 250); // SETS THE RADIUS OF THE SPIRAL THE LEAVES ARE IN
  frontLeafRadius = random(100, 180); // ^^^
  backgroundLeaves = floor(random(6, 11)); // FINDS A RANDOM VALUE FOR LEAF PAIRS IN BG

  // SIN + SCALE VALUE
  sinValue = sin(-1, 1, 120, 150);

  // SET PETAL AMOUNT FOR ANGLES LOOP
   for (let i = 0; i < 5; i++) {
    petalAngles.push((360 / 5) * i);
  }

  // END OF SETUP
}

function draw() {
  // MAP FUNCTION FOR PARALLAX
  xParallaxBack = map(mouseX, 0, width, -5, 5);
  yParallaxBack = map(mouseY, 0, height, -5, 5);

  xParallaxFlower = map(mouseX, 0, width, -10, 10);
  yParallaxFlower = map(mouseY, 0, height, -10, 10);

  // DARK BG COLOR
  background(19, 32, 25);

  // HALFTONE FOR LOOP
  // REFERENCED FROM EXAMPLE 4-13 IN THE TEXTBOOK
  for (x = 0; x <= width; x += 20) {
    for (y = -550; y <= width; y += 20) {
      noStroke();
      fill(11, 18, 16);
      circle(x, y + x / 5, 15);
    }
  }

  // BACKGROUND LEAVES
  push();
  translate(xParallaxBack, yParallaxBack);
  backLeaf(backLeafScale, backLeafRadius);
  pop();

  // FOREGROUND LEAVES
  frontLeaf(frontLeafScale, frontLeafRadius);

  // FLOWER
  push();
  translate(xParallaxFlower + xPosShake, xParallaxFlower + yPosShake);
  flower(width / 2, height / 2, flowerRed, flowerGreen, flowerBlue);
  pop();

  // JITTER ON CLICK
  xPosShake *= 1;
  yPosShake *= 1;

  // CONDITIONAL FOR BAD/GOOD ENDING (BASED OFF AMT OF CLICKS)
  if (clickCounter >= 2.2) {
    badEnding();
  }
  // IF FEWER CLICKS + 10 SECONDS HAVE PASSED, CALL GOOD ENDING
  if (clickCounter <= 2.1 && frameCount >= 600) {
    goodEnding();
  }
}

function backLeaf(backLeafScale, backLeafRadius) {
  // BG LEAF CENTER
  push();
  translate(width / 2, height / 2);
  rotate(rotateAngle);

  // BG CIRCLE
  push();
  fill(19, 32, 25);
  stroke(11, 18, 16);
  circle(0, 0, backLeafRadius + 75);
  pop();

  // BG LEAF SIZING
  let w = 225 * backLeafScale;
  let h = 175 * backLeafScale;

  // NESTED LOOPS FOR LEAF PAIRS
  for (let i = 1; i < backgroundLeaves; i++) {
    let angle = (360 / backgroundLeaves) * i;

    // TO ROTATE
    rotateAngle += 0.01;

    // FIRST SET OF LEAF PAIRS
    push();
    translate(backLeafRadius * cos(angle), backLeafRadius * sin(angle));
    rotate(angle);
    fill(30, 59, 45);
    stroke(45, 94, 65);
    arc(0, 0, w, h, 0, 150, CHORD);
    pop();

    // SECOND SET OF LEAF PAIRS
    push();
    translate(
      backLeafRadius * cos(angle + 180),
      backLeafRadius * sin(angle + 180)
    );
    rotate(angle + 180);
    fill(30, 59, 45);
    stroke(45, 94, 65);
    arc(0, 0, w, h, 0, 150, CHORD);
    pop();
  }
  pop();
}

function frontLeaf(frontLeafScale, frontLeafRadius) {
  // LEAF CENTER
  push();
  translate(width / 2, height / 2);
  rotate(rotateAngle);

  // LEAF SIZING
  w = 225 * frontLeafScale;
  h = 175 * frontLeafScale;

  // NESTED LOOPS FOR LEAF PAIRS
  for (let i = 0; i < 3; i++) {
    let angle = (360 / 3) * i;

    // LEAF SHADOW
    push();
    translate(frontLeafRadius * cos(angle), frontLeafRadius * sin(angle));
    rotate(angle);
    fill(19, 32, 25, 75);
    arc(0 - offset, 0 - offset, w, h, 0, 150, CHORD);
    pop();

    // FIRST SET OF LEAF PAIRS
    push();
    translate(frontLeafRadius * cos(angle), frontLeafRadius * sin(angle));
    rotate(angle);
    stroke(233, 198, 156);
    fill(94, 153, 89);
    arc(0, 0, w, h, 0, 150, CHORD);
    pop();

    // LIGHTER LEAF COLOR OFFSET
    push();
    translate(frontLeafRadius * cos(angle), frontLeafRadius * sin(angle));
    rotate(angle);
    fill(19, 32, 25, 75);
    arc(0 - offset, 0 - offset, w, h, 0, 150, CHORD);
    pop();

    // SECOND SET OF LEAF PAIRS
    push();
    translate(
      frontLeafRadius * cos(angle + 180),
      frontLeafRadius * sin(angle + 180)
    );
    rotate(angle + 180);
    stroke(233, 198, 156);
    fill(45, 94, 65);
    arc(0, 0, w, h, 0, 150, CHORD);
    pop();
  }
  pop();
}

function flower(xFlowerPos, yFlowerPos, flowerRed, flowerGreen, flowerBlue) {
  let scaleValue = petalSize * flowerScale;

  // ITERATE OVER THE LENGTH OF THE ARRAY FOR THE AMOUNT OF PETALS
  for (let i = 0; i < petalAngles.length; i++) {
    let angle = petalAngles[i];
    petalRotation = angle + sinValue * 20;

    // PETAL ELLIPSE
    push();
    translate(
      xFlowerPos + cos(petalRotation) * scaleValue,
      yFlowerPos + sin(petalRotation) * scaleValue
    );
    rotate(petalRotation + sinValue * 20);
    fill(flowerRed, flowerGreen, flowerBlue);
    stroke(70, 29, 33);
    ellipse(
      0,
      0,
      scaleValue / clickCounter + 35,
      scaleValue / clickCounter + petalHeight
    );
    pop();
  }

  // CENTER OF FLOWER
  push();
  translate(xFlowerPos, yFlowerPos);
  rotate(flowerRotateAngle);
  strokeWeight(3);
  stroke(70, 29, 33);
  fill(flowerRed, flowerGreen, flowerBlue);
  ellipse(0, 0, scaleValue + 45, scaleValue + 35);
  pop();

  push();
  translate(xFlowerPos, yFlowerPos);
  rotate(flowerRotateAngle);
  stroke(233, 198, 156);
  fill(70, 29, 33);
  ellipse(0, 0, scaleValue + 35, scaleValue + 25);
  pop();
}

function mousePressed() {
  // INCREMENT CLICKS FOR CONDITIONALS
  clickCounter += 0.1;

  // DECREMENT PETAL SIZE FOR EVERY CLICK
  petalSize -= 10;

  // SET MINIMUM FOR PETAL SIZE
  if (petalSize <= 20) {
    petalSize = 20;
  }

  // NOISE MAP FUNCTION TO MAKE FLOWER JITTER ON CLICK
  if (mouseIsPressed == true) {
    let noiseInputX = frameCount + random(0, 1);
    let noiseInputY = frameCount + random(0, 1);

    xPosShake = map(
      noise(noiseInputX),
      0,
      1,
      -5 * clickCounter,
      5 * clickCounter
    );
    yPosShake = map(
      noise(noiseInputY),
      0,
      1,
      -5 * clickCounter,
      5 * clickCounter
    );
  }
}

function badEnding() {
  // FLOWER TURNS BLACK
  if (flowerScale > 0.01) {
    flowerScale -= 0.01;
    flowerRed -= 2;
    flowerGreen -= 1;
    flowerBlue -= 1;
  }

  // TEXT APPEARS ONCE FLOWER IS BLACK
  if (flowerRed < 0) {
    textAlign(CENTER, CENTER);
    textSize(16);
    stroke(0);
    fill(255);
    text(
      "The flower dies.\n Please be more gentle.\nPress 'R' to restart.",
      width / 2,
      height / 2
    );
  }
}

function goodEnding() {
  // CONDITIONAL TO RANDOMIZE & INITIALIZE FLOWER COLOR
  if (targetRed == undefined || targetGreen == undefined || targetBlue == undefined) {
    targetRed = random(100, 160);
    targetGreen = random(180, 255);
    targetBlue = random(120, 255); 
  }

  // LERP FUNCTION TO EASE FLOWER INTO GROWTH
  petalHeight = lerp(petalHeight, 100, 0.05);
  flowerScale = lerp(flowerScale, 1.5, 0.03);

  // LERP FUNCTION TO EASE FLOWER INTO RANDOM COLOR
  flowerRed = lerp(flowerRed, targetRed, 0.02);
  flowerGreen = lerp(flowerGreen, targetGreen, 0.02);
  flowerBlue = lerp(flowerBlue, targetBlue, 0.02);

  // RESETS CLICK COUNTER TO 1 SO BAD ENDING DOESN'T TRIGGER
  clickCounter = 1;

  // DON'T ALLOW FLOWER TO SHRINK IF MOUSE IS PRESSED AFTER GOOD ENDING
  if (mouseIsPressed == true) {
    petalSize = 175;
  }

  // TEXT APPEARS ONCE FLOWER IS CLOSE TO TARGET VALUES
  if (
  flowerRed > targetRed - 10 && flowerRed < targetRed + 10 &&
  flowerGreen > targetGreen - 10 && flowerGreen < targetGreen + 10 &&
  flowerBlue > targetBlue - 10 && flowerBlue < targetBlue + 10
  ) { 
    textAlign(CENTER, CENTER);
    textSize(16);
    fill(255);
    stroke(0);
    text(
      "The flower blooms.\nThank you for being gentle.\nPress 'R' to restart.",
      width / 2,
      height / 2
    );
  }
}

// RESET FUNCTION (RESETS ALL VARIABLES TO DEFAULT)
function keyPressed() {
  if (key == "r") {
    frameCount = 0;
    flowerScale = 1;

    sinValue = 0;
    clickCounter = 1;

    flowerRed = 166;
    flowerGreen = 88;
    flowerBlue = 71;

    petalSize = 175;
    petalHeight = 0;

    targetRed = undefined;
    targetGreen = undefined;
    targetBlue = undefined;

    flower(
      width / 2 + xPosShake,
      height / 2 + yPosShake,
      flowerRed,
      flowerGreen,
      flowerBlue
    );
  }
}
