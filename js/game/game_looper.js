(function () {
  "use strict";

  /**
   * Schedules some function to run at browser animation frame interval.
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
      that._request = window.requestAnimationFrame(tick);

      timeBefore = window.performance.now();
      f(timeElapsed);
      timeElapsed = window.performance.now() - timeBefore;
    }(this));
  };

  /**
   * Stops looping of current function.
   */
  GameLooper.prototype.stop = function () {
    if (this._request !== null) {
      window.cancelRequestAnimationFrame(this._request);
      this._request = null;
    }
  };

  module.exports = GameLooper;

  // Compatibility measures.

  window.performance = window.performance || {};
  window.performance.now = (function () {
    return window.performance.now ||
      window.performance.webkitNow ||
      window.performance.mozNow ||
      window.performance.msNow ||
      window.performance.oNow ||
      function () {
        return new Date().getTime();
      };
  })();

  window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  window.cancelRequestAnimationFrame = (function () {
    return window.cancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
      window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
      window.clearTimeout;
  });

}());
