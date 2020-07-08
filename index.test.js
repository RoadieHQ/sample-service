const assert = require('assert');

const { sum } = require('./index');

describe('#sum', function () {
  it('should return 3', function () {
    assert.equal(sum(2, 1), 3);
  });
});
