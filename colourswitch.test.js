//Change colour of ball on click
var colourSelected = "black";

document.getElementById("redSwatch").onclick = function() {
  return colourSelected = "red"
};
document.getElementById("orangeSwatch").onclick = function() {
  return colourSelected = "orange"
};
document.getElementById("yellowSwatch").onclick = function() {
  return colourSelected = "yellow"
};
document.getElementById("greenSwatch").onclick = function() {
  return colourSelected = "green"
};
document.getElementById("blueSwatch").onclick = function() {
  return colourSelected = "blue"
};
document.getElementById("indigoSwatch").onclick = function() {
  return colourSelected = "indigo"
};
document.getElementById("violetSwatch").onclick = function() {
  return colourSelected = "violet"
};
document.getElementById("blackSwatch").onclick = function() {
  return colourSelected = "black"
};


exports.colourSelected = colourSelected;
