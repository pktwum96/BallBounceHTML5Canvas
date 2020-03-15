//Get and set canvas width and height

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;


//Change colour of ball on click
var colourSelected = "black";

document.getElementById("redSwatch").onclick = function() {
  colourSelected = "red"
};
document.getElementById("orangeSwatch").onclick = function() {
  colourSelected = "orange"
};
document.getElementById("yellowSwatch").onclick = function() {
  colourSelected = "yellow"
};
document.getElementById("greenSwatch").onclick = function() {
  colourSelected = "green"
};
document.getElementById("blueSwatch").onclick = function() {
  colourSelected = "blue"
};
document.getElementById("indigoSwatch").onclick = function() {
  colourSelected = "indigo"
};
document.getElementById("violetSwatch").onclick = function() {
  colourSelected = "violet"
};
document.getElementById("blackSwatch").onclick = function() {
  colourSelected = "black"
};



//set speed of ball by monitoring how long mouse is clicked
var timerID;
var counter = 0;

// Increase or decreae value to adjust how long
// one should keep pressing down before the pressHold
// event fires
var position = {
  x: 0,
  y: 0
}
var balls = [];
var pressHoldDuration = 100;

// Listening for the mouse events
canvas.addEventListener("mousedown", pressingDown, false);
canvas.addEventListener("mouseup", notPressingDown, false);

function pressingDown(e) {
  // Start the timer
  requestAnimationFrame(timer);
  e.preventDefault();
}

function notPressingDown(e) {
  // Stop the timer

  //Get position of mouse after click
  console.log(event);
  position.x = event.offsetX;
  //y value
  position.y = event.offsetY;

  //positon gets cordinates of the ball, counter is the speed of the ball multiplied by a + or minus 1 to determine direction (left or right)
  var ball = new Ball(position.x, position.y, counter / 10 * Math.floor(Math.random() * (3)) + -1, counter / 10, 10, colourSelected);
  if (position.y <= 11 || position.x <= 11 || position.y >= canvas.height - 10 || position.x >= canvas.width - 10) {
    console.log("too close to edge");
  } else {
    balls.push(ball);
  }
  console.log(balls);
  cancelAnimationFrame(timerID);
  counter = 0;
}

function timer() {

  if (counter < pressHoldDuration) {
    timerID = requestAnimationFrame(timer);
    counter++;
  }
}

var gravity = 0.4;
var friction = 0.8;

var context = canvas.getContext('2d');

//Object to store information about balls
function Ball(positionX, positionY, vectorX, vectorY, radius, ballColour) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.vectorX = vectorX;
  this.vectorY = vectorY;
  this.ballRadius = radius;
  this.ballColour = ballColour;

  this.createBall = function() {
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.ballRadius, 0, Math.PI * 2, false);
    context.fillStyle = this.ballColour;
    context.fill();
  }

  this.updateAnimation = function() {
    //Change direction and reduce speed when hits walls
    if (this.positionX + this.ballRadius >= canvas.width || this.positionX - this.ballRadius <= 0) {
      this.vectorX = -this.vectorX * friction;
    }
    //Change direction and reduce speed when hits walls
    if (this.positionY + this.ballRadius - this.vectorY >= canvas.height || this.positionY - this.ballRadius <= 0) {
      this.vectorY = -this.vectorY * friction;
    } else {
      //Apply gravity reducing speed
      this.vectorY -= gravity;
    }
    //reduce speed when in contact with floor
    if (this.positionY + this.ballRadius - this.vectorY >= canvas.height) {
      this.vectorX = this.vectorX * friction;
    }
    //apply displacement using speed etc
    this.positionX -= this.vectorX;
    this.positionY -= this.vectorY;
    this.createBall();
  }

}


function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  balls.forEach((item, i) => {
    item.updateAnimation();
  });

}

animate();
