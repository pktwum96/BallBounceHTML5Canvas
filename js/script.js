//Get and set canvas width and height

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

//Set Defaukt ball Colour
var colourSelected = "black";

//set speed of ball by monitoring how long mouse is clicked
var timerID;
var counter = 0;

// Increase or decreae value to adjust how long
// one should keep pressing down before the pressHold
// event fires

var balls = [];
var pressDuration = 100;

// Listening for the mouse events
canvas.addEventListener("mousedown", pressingDown, false);
canvas.addEventListener("mouseup", notPressingDown, false);

function pressingDown(e) {
  // Start the timer
  requestAnimationFrame(timer);
  e.preventDefault();
}

function notPressingDown(e) {
  updateInstruction("");
  //Get position of mouse after click
  var xCoordinate = event.offsetX;
  //y value
  var yCoordinate = event.offsetY;

  //positon gets cordinates of the ball, counter is the speed of the ball multiplied by a + or minus 1 to determine direction (left or right)
  createBall(xCoordinate, yCoordinate, counter);
  cancelAnimationFrame(timerID);
  counter = 0;
}

function timer() {

  if (counter < pressDuration) {
    timerID = requestAnimationFrame(timer);
    counter++;
  } else {
    updateInstruction("threshold");
  }
}

var gravity = 0.4;
var friction = 0.9;

var context = canvas.getContext('2d');

//Object to store information about balls
function Ball(positionX, positionY, vectorX, vectorY, radius, ballColour) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.vectorX = vectorX;
  this.vectorY = vectorY;
  this.ballRadius = radius;
  this.ballColour = ballColour;

  this.drawBall = function() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.ballRadius, 0, Math.PI * 2, false);
    context.fillStyle = this.ballColour;
    context.fill();
  }

  this.updateAnimation = function() {
    //Change direction and reduce speed when hits walls
    if (this.positionX + this.ballRadius + this.vectorX > canvas.width || this.positionX - this.ballRadius + this.vectorX < 0) {
      this.vectorX = -this.vectorX * friction;
    }
    //Change direction and reduce speed when hits walls
    if (this.positionY + this.ballRadius - this.vectorY > canvas.height || this.positionY - this.ballRadius - this.vectorY < 0) {
      this.vectorY = -this.vectorY * friction;
    } else {
      //Apply gravity reducing speed
      this.vectorY -= gravity;
    }
    //reduce speed when in contact with floor
    if (this.positionY + this.ballRadius + this.vectorY >= canvas.height) {
      this.vectorX = this.vectorX * friction;
    }
    //apply displacement using speed etc
    this.positionX += this.vectorX;
    this.positionY -= this.vectorY;
    this.drawBall();
  }

}


function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  balls.forEach((item, i) => {
    item.updateAnimation();
  });

}
//Change colour of ball on click
function randomDirection() {
  var direction = 1;
  var random = Math.random();
  if (random > 0.5) {
    return direction = 1
  } else {
    return direction = -1
  }
}

function createBall(x, y, counter) {
  var ballRadius = 10;
  var velocity = counter / 7;
  var ball = new Ball(x, y, velocity * randomDirection(), velocity, ballRadius, colourSelected);
  if (y <= 11 || x <= 11 || y >= canvas.height - 10 || x >= canvas.width - 10) {
    updateInstruction("edge");
  } else {
    balls.push(ball);
  }
}

function updateInstruction(value) {
  var element = document.getElementById("instructionText");
  if (value == "threshold") {
    element.innerHTML = "THRESHOLD REACHED!!!";
    element.classList.add("blinking");
  } else if (value == "edge") {
    element.innerHTML = "TOO CLOSE TO EDGE!!";
    element.classList.add("blinking");
  } else {
    element.innerHTML = "PRESS AND HOLD TO INCREASE VELOCITY";
    element.classList.remove("blinking");
  }
}
animate();
