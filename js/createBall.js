//Set Default ball Colour and size
var ballSize = 12.5;

//array to stay all balls and their details
var balls = [];


//function to create ball using parameters
function createBall(x, y, counter, ballSize) {
  var velocity = counter / 5; //divided by 5 to reduce speed as otherwise too fast
  var random = Math.random(); //Generate a random number between 0 and 1
  var ball = new Ball(x, y, velocity * randomDirection(random), velocity, ballSize, colourSelected);
  //measure closeness to edge and not generate if too close to feasibly create ball
  if (y <= ballSize || x <= ballSize || y >= canvas.height - ballSize || x >= canvas.width - ballSize) {
    return updateInstruction("edge");
  } else {
    return balls.push(ball);
  }
}

module.exports = createBall;
