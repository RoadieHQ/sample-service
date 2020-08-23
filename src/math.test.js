const assert = require('assert');

const { sum, subtract } = require('./math');

describe('Math', function () {
  describe('#sum', function () {
    it('should return 3', function () {
      assert.equal(sum(2, 1), 3);
    });
  });

  describe('#subtract', function () {
    it('should return 3', function () {
      assert.equal(subtract(5, 2), 3);
    });
  });
});
