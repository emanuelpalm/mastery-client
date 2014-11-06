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
    this._getRequest = function () {
      return request;
    };
    this._setRequest = function (r) {
      request = r;
    };
  }

  /**
   * Loops given function f.
   *
   * @param  {Function} f Function to schedule.
   */
  GameLooper.prototype.loop = function (f) {
    this.stop();

    var setRequest = this._setRequest;

    var timeElapsed = 0.0,
      timeBefore;
    (function tick() {
      setRequest(context.requestAnimationFrame(tick));

      timeBefore = context.getMonotonicTime();
      f(timeElapsed);
      timeElapsed = context.getMonotonicTime() - timeBefore;
    }());
  };

  /**
   * Stops looping of current function.
   */
  GameLooper.prototype.stop = function () {
    var r = this._getRequest();
    if (r !== null) {
      context.cancelRequestAnimationFrame(r);
      this._setRequest(null);
    }
  };

  module.exports = GameLooper;
}());