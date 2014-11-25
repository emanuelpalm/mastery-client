(function () {
  "use strict";

  var promise = require("../../js/utils/promise.js");

  exports.testFulfill = function (test) {
    promise.fulfill("data")
      .then(function (data) {
        test.equal(data, "data");
        test.done();
      })
      .catch(function () {
        test.ok(false);
        test.done();
      });
  };

  exports.testReject = function (test) {
    promise.reject("error")
      .then(function () {
        test.ok(false);
        test.done();
      })
      .catch(function (error) {
        test.equal(error, "error");
        test.done();
      });
  };

  exports.testRace = function (test) {
    promise.race([
      promise.timeout(5, "slow"),
      promise.timeout(1, "fast"),
    ])
    .then(function (data) {
      test.equal(data, "fast");
      test.done();
    })
    .catch(function () {
      test.ok(false);
      test.done();
    });
  };

  exports.testRaceOneRejected = function (test) {
    promise.race([
      promise.timeout(1, "slow"),
      promise.reject("rejected"),
    ])
    .then(function (data) {
      test.equal(data, "slow");
      test.done();
    })
    .catch(function () {
      test.ok(false);
      test.done();
    });
  };

  exports.testRaceAllRejected = function (test) {
    promise.race([
      promise.expire(1, "fastest"),
      promise.expire(5, "slowest"),
    ])
    .then(function () {
      test.ok(false);
      test.done();
    })
    .catch(function (error) {
      test.equal(error, "slowest");
      test.done();
    });
  };

  exports.testStarve = function (test) {
    promise.starve([
      promise.timeout(1, "fast"),
      promise.timeout(5, "slow"),
    ])
    .then(function (data) {
      test.equal(data, "slow");
      test.done();
    })
    .catch(function () {
      test.ok(false);
      test.done();
    });
  };

  exports.testStarveOneRejected = function (test) {
    promise.starve([
      promise.expire(5, "slow"),
      promise.timeout(1, "fast"),
    ])
    .then(function (data) {
      test.equal(data, "fast");
      test.done();
    })
    .catch(function () {
      test.ok(false);
      test.done();
    });
  };

  exports.testStarveAllRejected = function (test) {
    promise.starve([
      promise.expire(1, "fast"),
      promise.expire(5, "slow"),
    ])
    .then(function () {
      test.ok(false);
      test.done();
    })
    .catch(function (error) {
      test.equal(error, "slow");
      test.done();
    });
  };

  exports.testTimeout = function (test) {
    test.expect(2);
    var hasTimedOut = false;

    promise.timeout(1, "timeout")
      .then(function (data) {
        test.equal(data, "timeout");
        hasTimedOut = true;
      })
      .catch(function () {
        test.ok(false);
      });

    test.equal(hasTimedOut, false);
    setTimeout(function () {
      test.done();
    }, 5);
  };

  exports.testTimeoutWithNoData = function (test) {
    promise.timeout(1)
      .then(function () {
        test.ok(true);
        test.done();
      })
      .catch(function () {
        test.ok(false);
        test.done();
      });
  };

  exports.testExpire = function (test) {
    test.expect(2);
    var hasExpired = false;

    promise.expire(1, "expire")
      .then(function () {
        test.ok(false);
      })
      .catch(function (error) {
        test.equal(error, "expire");
        hasExpired = true;
      });

    test.equal(hasExpired, false);
    setTimeout(function () {
      test.done();
    }, 5);
  };
}());
