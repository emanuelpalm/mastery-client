/**
 * Scheduling functions.
 *
 * @module utils/scheduler
 */
(function () {
  "use strict";

  /**
   * Determines current relative time, in seconds.
   *
   * Note: The time returned is not required to be relative to any particular
   * point in time, which makes it useless for using with dates.
   */
  exports.getMonotonicTime = isBrowser() ? function () {
    return window.performance.now() / 1000.0;
  } : function () {
    return new Date().getTime();
  };

  /**
   * Requests given function to be executed at next screen frame, or at some
   * other suitable point in the near future.
   */
  exports.requestAnimationFrame = isBrowser() ? function (f) {
    return window.requestAnimationFrame(f);
  } : function (callback) {
    return setTimeout(callback, 1000 / 60);
  };

  /**
   * Cancels referenced animation request.
   */
  exports.cancelRequestAnimationFrame = isBrowser() ? function (r) {
    window.cancelRequestAnimationFrame(r);
  } : function (r) {
    clearTimeout(r);
  };

  Object.freeze(exports);

  // Browser compatibility measures.
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
