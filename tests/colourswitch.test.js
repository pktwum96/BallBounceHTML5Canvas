//test colour of ball o
;
const assignColour =page.assignColour;

test('text colour assignment', () => {
  expect(assignColour("red")).toEqual("red");
});
