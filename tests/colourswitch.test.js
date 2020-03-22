//test colour of ball
const assignColour =require("../js/colourswitch");

test('text colour assignment', () => {
  expect(assignColour("red")).toEqual("red");
});
