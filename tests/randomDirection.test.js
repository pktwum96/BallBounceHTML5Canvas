//test direction of ball randomly by mutiplying by a factor of 1 or -1

const randomDirection = require('../js/randomDirection.js');

test('test output to be -1', () => {
  let testValue = randomDirection(0.4);
  expect(testValue).toEqual(-1);
});


test('test output to be 1', () => {
  let testValue = randomDirection(0.8);
  expect(testValue).toEqual(1);
});
