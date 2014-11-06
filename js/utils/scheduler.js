/**
 * Scheduling functions.
 *
 * @module utils/scheduler
 */
(function () {
  "use strict";

  /**
   * Determines current relative time.
   *
   * Note: The time returned is not required to be relative to any particular
   * point in time, which makes it useless for using with dates.
   *
   * @return {double} High definition time stamp.
   */
  exports.getMonotonicTime = isBrowser() ? function () {
    return window.performance.now();
  } : function () {
    return new Date().getTime();
  };

  /**
   * Requests given function to be executed at next screen frame, or at some
   * other suitable point in the near future.
   *
   * @param {Function} f - Function to schedule.
   * @return {long} Request reference.
   */
  exports.requestAnimationFrame = isBrowser() ? function (f) {
    return window.requestAnimationFrame(f);
  } : function (callback) {
    return setTimeout(callback, 1000 / 60);
  };

  /**
   * Cancels referenced animation request.
   *
   * @param {long} animationRequest - A reference to the animation to cancel.
   */
  exports.cancelRequestAnimationFrame = isBrowser() ? function (r) {
    window.cancelRequestAnimationFrame(r);
  } : function (r) {
    clearTimeout(r);
  };

  // Brosert compatibility measures.
  if (isBrowser()) {
    window.performance = window.performance || {};
    window.performance.now =
      window.performance.now ||
      window.performance.webkitNow ||
      window.performance.mozNow ||
      window.performance.msNow ||
      window.performance.oNow ||
      function () {
        return new Date().getTime();
      };
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 100);
      };
    window.cancelRequestAnimationFrame =
      window.cancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
      window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
      window.clearTimeout;
  }

  function isBrowser() {
    return (typeof window !== "undefined");
  }
}());
