//refresh page on window resize
window.onresize = function() {
  location.reload();
}

//Get and set canvas width and height
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
//set height to half of screen
canvas.height = window.innerHeight / 2;

//Set Default ball Colour and size
var colourSelected = "black";
var ballSize = 12.5;

//set speed of ball by monitoring how long mouse is clicked
var timerID;
var counter = 0;

//array to stay all balls and their details
var balls = [];

// Listening for the mouse events, triggers function that counts how long button is clicked
canvas.addEventListener("mousedown", pressingDown, false);
canvas.addEventListener("mouseup", notPressingDown, false);
// 
// //for mobile devices
// canvas.addEventListener("touchstart", pressingDown, false);
// canvas.addEventListener("touchend", notPressingDown, false);

//maximum speed threshold
var pressDuration = 100;

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

  //positon gets cordinates of the ball, counter is the speed of the ball
  createBall(xCoordinate, yCoordinate, counter, ballSize);
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

//factor to pull ball towards the bottom of screen
var gravity = 0.4;
//factor to reduce speed when in contact with a surface
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

  //draw ball on screen using details stored in object
  this.drawBall = function() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.ballRadius, 0, Math.PI * 2, false);
    context.fillStyle = this.ballColour;
    context.fill();
  }
  //physics simulator
  this.updateAnimation = function() {
    //Change direction and reduce speed when hits wall sides
    if (this.positionX + this.ballRadius + this.vectorX > canvas.width || this.positionX - this.ballRadius + this.vectorX < 0) {
      this.vectorX = -this.vectorX * friction;
    }

    //Change direction and reduce speed when hits walls top and bottom
    if (this.positionY + this.ballRadius - this.vectorY > canvas.height || this.positionY - this.ballRadius - this.vectorY < 0) {
      this.vectorY = -this.vectorY * friction;
    } else {
      //Apply gravity reducing speed
      this.vectorY -= gravity;
    }
    //reduce speed when in contact with botom
    if (this.positionY + this.ballRadius + this.vectorY >= canvas.height) {
      this.vectorX = this.vectorX * friction;
    }
    //apply displacement using speed etc
    this.positionX += this.vectorX;
    this.positionY -= this.vectorY;
    this.drawBall();
  }
}


//animate ball
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  //call all balls stired in array and animate
  balls.forEach((item, i) => {
    item.updateAnimation();
  });
}

animate();


//Change direction of ball randomly by mutiplying by a factor of 1 or -1
function randomDirection() {
  var direction = 1;
  var random = Math.random();
  if (random > 0.5) {
    return direction = 1
  } else {
    return direction = -1
  }
}

function createBall(x, y, counter, ballSize) {
  var velocity = counter / 5; //divided by 5 to reduce speed as otherwise too fast
  var ball = new Ball(x, y, velocity * randomDirection(), velocity, ballSize, colourSelected);
  //measure closeness to edge and not generate if too close to feasibly create ball
  if (y <= ballSize || x <= ballSize || y >= canvas.height - ballSize || x >= canvas.width - ballSize) {
    return updateInstruction("edge");
  } else {
    return balls.push(ball);
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
