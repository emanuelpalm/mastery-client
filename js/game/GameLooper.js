(function () {
  "use strict";

  var scheduler = require("../utils/scheduler.js");

  /**
   * Schedules some function to run at browser animation frame interval.
   *
   * @class
   */
  function GameLooper() {
    var request = null;

    /**
     * Loops given function f.
     */
    this.loop = function (f) {
      this.stop();

      var timeElapsed = 0.0,
        timeBefore;
      (function tick() {
        timeElapsed = scheduler.getMonotonicTime() - timeBefore;
        request = scheduler.requestAnimationFrame(tick);

        timeBefore = scheduler.getMonotonicTime();
        f(timeElapsed);
      }());
    };

    /**
     * Stops looping of current function.
     */
    this.stop = function () {
      if (request !== null) {
        scheduler.cancelRequestAnimationFrame(request);
        request = null;
      }
    };

    Object.seal(this);
  }

  module.exports = GameLooper;
}());
