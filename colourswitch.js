//Change colour of ball on click
var colourSelected = "black";

var list = document.getElementById("colourPalette");
list.onclick = function(event) {
  return colourSelected = event.target.id;
}
