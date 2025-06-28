//     STUPIDLY AWESOME HACKATHON PROJECT CODE        //
//   CREATED WITH LOVE & TEARS BY AUBREY DEROBERTIS   //
////////////////////////////////////////////////////////

// FOR ARDUINO CONNECTION
let port;
let connectBtn;
let str;
let val; 

// CREATE EMPTY ARRAY & LOOP OVER IT WITH SOUND NAMES
let sounds = [];

// ARRAY OF NAMES FOR SOUNDS
let soundNames = ["meow", "woof", "quack", "fart", "bruh", "moo", "cricket",
  "horse", "snore", "vineboom", "amongus", "squeaky", "monkey", "eagle",
  "trombone", "tacobell", "oink", "revving", "windows", "fettywap"]

// CREATE EMPTY ARRAY & LOOP OVER IT WITH IMAGE NAMES
let images = [];

// ARRAY OF NAMES FOR IMAGES
let imageNames = ["icon-cat", "icon-dog", "icon-duck", "icon-fart"]

// BY DEFAULT, DO NOT SHOW THE MENU
let showProgram = false;

// INITIALIZING LOGO IMAGE
let logo;

// FOR INITIALIZING OBJECTS
let diffsound;
let program;

// FOR STROKE WEIGHT
let catTrue = 1;
let dogTrue = 1;
let duckTrue = 1;
let fartTrue = 1;

// LOAD SOUNDS + IMAGES + FONTS
function preload() {
  // FOR LOOP, SO THAT I DON'T HAVE TO LOAD 20-ISH SOUNDS....
  for (n = 0; n < soundNames.length; n++) {
  sounds.push(loadSound("assets/"+soundNames[n]+".mp3"))
}

  // FOR LOOP, SO THAT I DON'T HAVE TO USE FOUR DIFFERENT VARIABLES FOR THE IMAGES :-)
  for (n = 0; n < imageNames.length; n++) {
  images.push(loadImage("assets/"+imageNames[n]+".png"))
}

  logo = loadImage("assets/shusherlogo.png");
  font = loadFont("assets/comicsans.ttf");
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
function setup() {
  let canvas = createCanvas(1000, 1080);
  canvas.parent("p5-canvas-container");

  // INITIALIZE PROGRAM/DIFFSOUND TO USE IN FUNCTIONS
  program = new Program(1000, 1000);
  diffsound = new Speaker(sounds);

   port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }

  // BUTTON TO CONNECT TO ARDUINO
  connectBtn = createButton("connect to arduino!");
  connectBtn.mousePressed(connectBtnClick);
  connectBtn.position(20, 20);

}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

function draw() {
  background(255);
  
  // BY DEFAULT, SHOW MENU
  program.menu();

  // IF SHOWPROGRAM HAS BEEN TURNED TO TRUE (BY BUTTON), DISPLAY PROGRAM
  if (showProgram == true) {
    program.display();
  }
  
  // ARDUINO STUFF
  str = port.readUntil("\n");

  if (str.length > 0) {
    val = int(str.split(",")); //split the values if there is a comma in between and convert them into numbers

    // CONSTRAIN 0-1032 VOLUME TO 0-50
    // & THEN MAP IT TO VALUES FROM 0.0 - 1.0 FOR VOLUME
    s = map(val[1], 0, 50, 0, 1.0);
    console.log(val);

    // IF BUTTON IS TURNED ON, SHOW PROGRAM
    if (val[0] == 1) {
      console.log("on")
      showProgram = true;
      
    // ELSE IF BUTTON IS OFF, TURN OFF PROGRAM
    } else if (val[0] == 0) {
      showProgram = false;
    }

    // IF THE VOLUME THRESHOLD HAS BEEN MET & PROGRAM IS RUNNING, PLAY CURRENT SOUND
    if (val[1] > 5 && showProgram == true) {
      diffsound.play();
    }

    // IF RANDOMIZE BUTTON IS SELECTED, PICK A RANDOM SOUND
    // HOLDING BUTTON WILL PLAY MANY MANY RANDOM SOUNDS IN SUCCESSION
    // BUT PRESSING IT ONCE WILL PICK A RANDOM SOUND FROM THE ARRAY
    // & KEEP IT THAT WAY :-)
    if (val[2] == 1) {
      diffsound.randomize();

          // fill(0);
          // textSize(32);
          // textFont(font);
          // text("random mode ACTIVATED!!!!", 290, 870);
    }
}
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

class Program {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }

  click(x, y) {
  // VALUES FOR BUTTON LOCATIONS
  let w = 200;
  let h = 200;
  let gap = 20;

  let startX = 290;
  let startY = 290;

  // ONLY RUN THIS CONDITIONAL IF PROGRAM IS RUNNING
  if (showProgram == true) {
    // CAT BUTTON
    if (x > startX && x < startX + w && y > startY && y < startY + h) {
      diffsound.playSound(0);
      // SET ALL STROKES TO 1, EXCEPT FOR THE CAT ONE, WHEN MOUSE HAS SELECTED IT
      catTrue = 4;
      duckTrue = 1;
      fartTrue = 1;
      dogTrue = 1;
    }

    // DOG BUTTON
    else if (x > startX + w + gap && x < startX + 2*w + gap && y > startY && y < startY + h) {
      diffsound.playSound(1);
      dogTrue = 4;
      duckTrue = 1;
      fartTrue = 1;
      catTrue = 1;

    }

    // DUCK BUTTON
    else if (x > startX && x < startX + w && y > startY + h + gap && y < startY + 2*h + gap) {
      diffsound.playSound(2);
      duckTrue = 4;
      catTrue = 1;
      dogTrue = 1;
      fartTrue = 1;
    }

    // FART BUTTON
    else if (x > startX + w + gap && x < startX + 2*w + gap && y > startY + h + gap && y < startY + 2*h + gap) {
      diffsound.playSound(3);
      fartTrue = 4;
      catTrue = 1;
      dogTrue = 1;
      duckTrue = 1;
    }
  }
}

  // "SCREENSAVER" METHOD - MAIN MENU BEFORE INTERACTION
  menu() {
    push();
    image(logo, 0, 0);
    pop();
  }

  // ONCE "ON" BUTTON IS PRESSED, MENU WILL DISPLAY
  display() {
    background(255);
    let w = 200;
    let h = 200;
    let gap = 20;

    let startX = width/2 - w - gap/2;
    let startY = height/2 - h - gap/2;


    strokeWeight(catTrue);
    fill("white");
    rect(startX, startY, w, h, 40);
    textSize(48);
    textFont("Courier New");
    image(images[0], startX + 75, startY + 80);

    strokeWeight(dogTrue);
    fill("white");
    rect(startX + w + gap, startY, w, h, 40);
    image(images[1], startX + w + gap + 75, startY + 80);

    strokeWeight(duckTrue);
    fill("white");
    rect(startX, startY + h + gap, w, h, 40);
    image(images[2], startX + 75, startY + h + gap + 80);

    strokeWeight(fartTrue);
    fill("white");
    rect(startX + w + gap, startY + h + gap, w, h, 40);
    image(images[3], startX + w + gap + 75, startY + h + gap + 80);

    fill(0);
    textSize(32);
    textFont(font);
    text("volume blocked: " + s, 340, 820);
    textSize(16);
    text("to turn device off: gesture against your middle finger", 300, 280);
    text("for a surprise: gesture against your ring finger", 300, 300)

    if (val[2] == 1) {
      fill(0);
      textSize(32);
      textFont(font);
      text("random mode ACTIVATED!!!!", 285, 870);
    }
  }

}

class Speaker {
  constructor(s) {
    this.sounds = s;
    this.currentIdx = 0;
  }

  // PLAY SOUND OF CURRENT INDEX IN ARRAY
  play() {
    this.sounds[this.currentIdx].play();
  }

  // PLAY SOUND OF CURRENT INDEX
  // (NO MORE SEPARATE METHODS FOR DIFFERENT SOUNDS!!!)
  playSound(idx) {
    if (idx >= 0 && idx < this.sounds.length) {
      this.currentIdx = idx;
      this.play();
    }
  }

  // "RANDOMIZE" METHOD TO PICK A RANDOM INDEX FROM THE ARRAY OF SOUNDS
  // & STOP FOR LOOP ONCE NEW VALUE HAS BEEN FOUND
  randomize() {
    let newIdx;

    for (let i = 0; i < this.sounds.length; i++) {
      newIdx = floor(random(this.sounds.length)); 
      if (newIdx !== this.currentIdx) {
        this.currentIdx = newIdx;
        break;
      }
    }
  } 
}

// FUNCTION TO INTERACT WITH MENU BUTTONS
function mousePressed(){
  program.click(mouseX, mouseY);
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open("Arduino", 57600);
  } else {
    port.close();
  }
}