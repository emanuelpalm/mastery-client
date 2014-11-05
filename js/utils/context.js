/**
 * This module encapsulates the document and window objects available globally
 * when executing JavaScript in a browser. The functions contained are
 * guaranteed to exist, even if the encapsulated browser functions do not.
 *
 * @module utils/context
 */
(function () {
  "use strict";

  if (typeof window !== "undefined") {

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
        return window.setTimeout(callback, 1000 / 60);
    };
    window.cancelRequestAnimationFrame =
      window.cancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
      window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
      window.clearTimeout;

  }

  /**
   * Creates a new HTML element.
   *
   * @param {string} tagName - Tag-name of element to create.
   * @return {HTMLElement} Created HTML element.
   */
  exports.createElement = (document) ? function (tagName) {
    return document.createElement(tagName);
  } : function () {
    return {};
  };

  /**
   * Removes all HTML elements in context body and inserts the given
   * element.
   *
   * @param {HTMLElement} $element - Element to set.
   */
  exports.setBodyElement = (document && typeof document.body !== "undefined") ? function ($element) {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild($element);
  } : function () {};

  /**
   * Determines current relative time.
   *
   * Note: The time returned is not required to be relative to any particular
   * point in time, which makes it useless for using with dates.
   *
   * @return {double} High definition time stamp.
   */
  exports.getMonotonicTime = (typeof window !== "undefined") ? function () {
    return window.performance.now();
  } : function () {
    return new Date().getTime();
  };

  /**
   * Requests given function to be displayed at next screen frame.
   *
   * @param {Function} f - Function to schedule.
   * @return {long} Request reference.
   */
  exports.requestAnimationFrame = (typeof window !== "undefined") ? function (f) {
    return window.requestAnimationFrame(f);
  } : function (callback) {
    return setTimeout(callback, 1000 / 60);
  };

  /**
   * Cancels referenced animation request.
   *
   * @param {long} animationRequest - A reference to the animation to cancel.
   */
  exports.cancelRequestAnimationFrame = (typeof window !== "undefined") ? function (r) {
    window.cancelRequestAnimationFrame(r);
  } : function (r) {
    clearTimeout(r);
  };

}());