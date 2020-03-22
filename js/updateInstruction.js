function updateInstruction(value) {
  var element = document.getElementById("instructionText");
  if (value == "threshold") {
    element.innerHTML = "THRESHOLD REACHED!!!";
    element.classList.add("blinking");
    return "Limit Warning";
  } else if (value == "edge") {
    element.innerHTML = "TOO CLOSE TO EDGE!!";
    element.classList.add("blinking");
    return "Edge Warning";
  } else {
    element.innerHTML = "PRESS AND HOLD TO INCREASE VELOCITY";
    element.classList.remove("blinking");
    return "Default Instructions"
  }
}


module.exports = updateInstruction;
