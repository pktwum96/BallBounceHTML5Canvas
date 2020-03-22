//Change colour of ball on click
var colourSelected = "black";

//run when DOM has been loaded
document.addEventListener('DOMContentLoaded', function() {
  var list = document.getElementById("colourPalette");
  list.onclick = function(event) {
    console.log(assignColour(event.target.id));
  }
});
const assignColour = (colour) => {
  return colourSelected = colour;
}

module.exports.assignColour = assignColour;
