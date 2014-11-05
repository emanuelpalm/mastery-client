(function () {
  "use strict";

  var GameLooper = require("../../js/game/GameLooper.js");

  exports.loopAndStop = function (test) {
    var looper = new GameLooper();
    var counter = 0,
      timeElapsed = null;

    looper.loop(function (dt) {
      counter++;
      timeElapsed = dt;
    });

    test.expect(2);

    setTimeout(function () {
      test.ok(counter > 0, "Loop function never called.");
      test.ok(timeElapsed !== null, "Elapsed time not given when loop called.");
      looper.stop();

      test.done();
    }, 12);
  };
}());