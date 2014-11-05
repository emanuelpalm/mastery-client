(function () {
  "use strict";

  var context = require("../utils/context.js");

  /**
   * Schedules some function to run at browser animation frame interval.
   *
   * @class
   */
  function GameLooper() {
    this._request = null;
  }

  /**
   * Loops given function f.
   *
   * @param  {Function} f Function to schedule.
   */
  GameLooper.prototype.loop = function (f) {
    this.stop();

    var timeElapsed = 0.0,
      timeBefore;
    (function tick(that) {
      that._request = context.requestAnimationFrame(tick);

      timeBefore = context.getMonotonicTime();
      f(timeElapsed);
      timeElapsed = context.getMonotonicTime() - timeBefore;
    }(this));
  };

  /**
   * Stops looping of current function.
   */
  GameLooper.prototype.stop = function () {
    if (this._request !== null) {
      context.cancelRequestAnimationFrame(this._request);
      this._request = null;
    }
  };

  module.exports = GameLooper;

}());