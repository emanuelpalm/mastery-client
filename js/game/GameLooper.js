(function () {
  "use strict";

  var context = require("../utils/context.js");

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
        request = context.requestAnimationFrame(tick);

        timeBefore = context.getMonotonicTime();
        f(timeElapsed);
        timeElapsed = context.getMonotonicTime() - timeBefore;
      }());
    };

    /**
     * Stops looping of current function.
     */
    this.stop = function () {
      if (request !== null) {
        context.cancelRequestAnimationFrame(request);
        request = null;
      }
    };

  }

  module.exports = GameLooper;
}());
