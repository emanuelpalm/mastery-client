(function () {
  "use strict";

  var scheduler = require("../../js/utils/scheduler.js");

  exports.testGetMonotonicTime = function (test) {
    test.expect(1);

    var t1 = scheduler.getMonotonicTime();
    setTimeout(function () {
      var t2 = scheduler.getMonotonicTime();
      test.ok(t1 < t2);
      test.done();
    }, 1);
  };

  exports.testRequestAnimationFrame = function (test) {
    test.expect(1);

    scheduler.requestAnimationFrame(function () {
      test.ok(true);
      test.done();
    });
  };

  exports.testCancelAnimationFrame = function (test) {
    var request = scheduler.requestAnimationFrame(function () {
      test.ok(false);
    });
    scheduler.cancelRequestAnimationFrame(request);
    setTimeout(function () {
      test.done();
    }, 10);
  };

}());
