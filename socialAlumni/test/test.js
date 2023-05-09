const test = require('tape');
//Test to make sure continous integration checking works
test('My Test', (t) => {
  t.equal(1 + 1, 2, '1+1 should equal 2');
  t.end();
});