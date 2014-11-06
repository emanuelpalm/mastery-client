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
     *
     * @param  {Function} f Function to schedule.
     */
    this.loop = function (f) {
      this.stop();

      var timeElapsed = 0.0,
        timeBefore;
      (function tick() {
        request = scheduler.requestAnimationFrame(tick);

        timeBefore = scheduler.getMonotonicTime();
        f(timeElapsed);
        timeElapsed = scheduler.getMonotonicTime() - timeBefore;
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

  }

  module.exports = GameLooper;
}());
