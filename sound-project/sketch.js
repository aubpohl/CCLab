let xArray = [];
let yArray = [];
let diaArray = [];
let initalSizeOfArray = 20; // i can use any number here
let bap;

function preload() {
  bap = loadSound("sounds/8000__cfork__cf_fx_bloibb.mp3");
}

function setup() {
  createCanvas(800, 500);
  
  
  for(let i = 0; i < initalSizeOfArray; i++){

    xArray[i] = random(0, width);
    yArray[i] = random(0, height);
    diaArray[i] = random(15, 50);

  }
  
}

function draw() {
  background(220);

  // xArray[0] += 1;

  for(let i = 0; i < xArray.length; i++){
    let x = xArray[i];
    let y = yArray[i];
    let d = diaArray[i];

    xArray[1] += random(-1, 1);
    yArray[1] += random(-1, 1);
    diaArray += random(-1, 1);

    circle(x, y, d);
  }
  
}

function mousePressed() {
  bap.play();
  xArray.push(mouseX);
  yArray.push(mouseY);
  diaArray.push(random(10, 50));

}