//Change colour of ball on click
var colourSelected = "black";

var list = document.getElementById("colourPalette");
list.onclick = function(event) {
  console.log(assignColour(event.target.id));
}

function assignColour(colour) {
  return colourSelected = colour;
}
