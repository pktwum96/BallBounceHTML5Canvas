//test colour

const {assignColour} = require('../js/colourswitch.js');

test('test colour', () => {
  let testValue = assignColour("red");
  expect(testValue).toEqual("red");
});


test('test', () => {
  let testValue = assignColour("green");
  expect(testValue).toEqual("green");
});
