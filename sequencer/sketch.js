let bassArray = [false, false, false, false, false, false];
let boxSize = 80;
let topMargin = 50;

let speed = 4;
let playheadX = -speed;

let bass;

function preload() {
  bass = loadSound("assets/brendanCan.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);

  // drawBox(50, 50, boxSize, true);
  // drawBox(200, 50, boxSize, false);

  for (i = 0; i < bassArray.length; i++) {
    let x = i*boxSize;
    drawBox(x, topMargin, boxSize, bassArray[i]);
  }

  line(playheadX, 0, playheadX, height);
  playheadX += speed;

  // RESET TO 0 AT END OF BOXES
  if (playheadX >= bassArray.length*boxSize) {
    playheadX = 0;
  }

  // CHECK IF WE'VE ENTERED A NEW BOX
  if (playheadX % boxSize == 0) {
    let boxIdx = playheadX / boxSize;
    console.log(boxIdx);

    let boxStatus = bassArray[boxIdx];
    console.log(boxStatus);

    if (boxStatus == true) {
    bass.play();
  }
  }
}

function drawBox(x, y, size, checked) {
  push();
  translate(x, y);
  stroke("orange")
  strokeWeight(2);

  // IF BOX TRUE = BLACK, IF BOX FALSE = WHITE
  if (checked == true) {
    fill(0);
  } else {
    fill(255);
  }

  rect(0, 0, size, size);
  pop();
}

function mousePressed() {
  console.log(mouseX, mouseY);

  if (mouseY > topMargin && mouseY < topMargin+boxSize && mouseX < bassArray.length*boxSize) {
    let boxIdx = floor(mouseX / boxSize)
    console.log(mouseX, boxIdx);
    console.log(bassArray[boxIdx])
    
    if (bassArray[boxIdx] == false) {
      bassArray[boxIdx] = true;
    } else {
      bassArray[boxIdx] = false;
    }
  }

}