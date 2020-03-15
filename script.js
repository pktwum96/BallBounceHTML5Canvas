var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

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
  position.x = event.x;
  position.y = Math.round(event.y - canvas.height / 2 - 40);
  var ball = new Ball(position.x, position.y, counter / 10 * Math.floor(Math.random() * (1 - -1 + 1)) + -1, counter / 10, 10, colourSelected);
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

    this.positionX -= this.vectorX;
    this.positionY -= this.vectorY;
    if (this.positionX + this.ballRadius >= canvas.width || this.positionX - this.ballRadius <= 0) {
      this.vectorX = -this.vectorX * friction;
    }
    if (this.positionY + this.ballRadius - this.vectorY >= canvas.height || this.positionY - this.ballRadius <= 0) {
      this.vectorY = -this.vectorY * friction;
    } else {
      this.vectorY -= gravity;
    }
    if (this.positionY + this.ballRadius - this.vectorY >= canvas.height) {
      this.vectorX = this.vectorX * friction;
    }
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
