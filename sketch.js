/* class 24-34 angrybirds
 developer: Atishaya 
 topics: PhysicsEngine,Inheritence,JSON,API,functions,Arrays,Push() and pop()
*/

//Declare variables for game objects and behaviour indicators(FLAGS)

//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var userEngine, userWorld;

var bird;
var catapult;
var pig1, pig2;
var platform, ground;
var log1, log2, log3, log4;
var box1, box2, box3, box4, box5;


var backgroundImg, imagePath;

var score;
var gameState, timesPlayed;


//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {

  //function call to set background image based on time
  setBackgroundImg();
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  var canvas = createCanvas(1200, 400);

  userEngine = Engine.create();
  userWorld = userEngine.world;

  ground = new Ground(600, height, 1200, 20);
  platform = new Ground(150, 305, 300, 170);

  bird = new Bird(200, 100);
  console.log(bird)

  //creation of catapult with sling. Body of bird will be attached to the sling.
  catapult = new SlingShot(bird.body, { x: 200, y: 50 });

  //construction of layer1 using matter.js
  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 260, 300, PI / 2);

  //construction of layer2 using matter.js
  box3 = new Box(700, 240, 70, 70);
  box4 = new Box(920, 240, 70, 70);
  pig2 = new Pig(810, 220);
  log2 = new Log(810, 180, 300, PI / 2);

  //construction of layer3 using matter.js
  box5 = new Box(810, 160, 70, 70);
  log3 = new Log(760, 120, 150, PI / 7);
  log4 = new Log(870, 120, 150, -PI / 7);

  score = 0;

  gameState = "onSlingShot";

  timesPlayed = 0;

}



//All changes, conditions, manipulations, actions to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  if (backgroundImg) {
    background(backgroundImg);
  }

  Engine.update(userEngine);

  //diplay ground 
  ground.display();
  platform.display();

  bird.display();
  //display of catapult with sling. Body of bird will be attached to the sling.
  catapult.display();

  //display of layer1 using matter.js
  box1.display();
  box2.display();
  pig1.display();
  log1.display();

  //display of layer2 using matter.js
  box3.display();
  box4.display();
  pig2.display();
  log2.display();

  //display of layer3 using matter.js
  box5.display();
  log3.display();
  log4.display();

  
  //calculation of score
  if (gameState == "detached") {
    //trigger score based on visibility of each object of PIG class
    pig1.score();
    pig2.score();
  }

  // display score
  textSize(27);
  fill("white");
  noStroke();
  text("Score: " + score, 900, 50);

  displayRunnerPoofs();


  //display game over message
  if (timesPlayed == 4 && gameState != "WIN") {
    noStroke();
    textSize(100);
    fill("white");
    text("GAME OVER", width / 2 - 100, height / 2);
  }

  //display winning message
  if (pig1.visibility <= 0 && pig2.visibility <= 0) {
    gameState = "WIN";
    noStroke();
    textSize(100);
    fill("white");
    text("YOU WIN", width / 2 - 100, height / 2);
  }

}
function mouseDragged() {
  if (catapult.constraint.bodyA == bird.body && bird.body.position.x < 250) {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}

//function triggered when a clicked mouse is released
function mouseReleased() {
  if (timesPlayed < 4) {
    //function call to detach(release) a body (this.constraint.bodyA) from constraint
    catapult.detach();
    gameState = "detached";
  }
}

//function triggered when a key on keyboard is pressed         
function keyPressed() {
  if (keyCode == 32 && timesPlayed < 4 && gameState == "detached" && gameState != "WIN") {
    //function call to attach a body to CONSTRAINT (this.constraint.bodyA)
    catapult.attach(bird.body);
    timesPlayed += 1;
  }
}

function displayRunnerPoofs() {
  if (bird.body.speed > 10 && bird.body.position.x > 250 && catapult.constraint.bodyA == null) {
    var position = [bird.body.position.x, bird.body.position.y]
    bird.trajectory.push(position);
  }

  for (var i = 0; i < bird.trajectory.length; i++) {
    image(bird.smokeImage, bird.trajectory[i][0], bird.trajectory[i][1])
  }

}



//function definition to set background image based on time
async function setBackgroundImg() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
 

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);
  console.log(responseJSON);

  //from 6 am to 6 pm = 06 to 18 
  if (hour >= 06 && hour < 19) {
    imagePath = "image/day.png";
  }
  //from 7 pm to 5am = 19 to 05 
  else {
    imagePath = "image/night2.jpeg";
  }

  backgroundImg = loadImage(imagePath);
}