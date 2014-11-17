/**
 * Contains functions for synchronously GETing HTTP resources.
 *
 * @module utils/http-sync
 */
(function () {
  "use strict";

  var xhr = null,
    result = null,
    error = null;

  if (isBrowser()) {
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function (evt) {
      result = evt.target.response;
    });
    xhr.addEventListener("error", function (evt) {
      console.log(evt);
    });
  }

  /**
   * Synchronously acquires and returns resource at given path.
   *
   * Throws exception on any error.
   */
  exports.get = isBrowser() ? function (path) {
    xhr.open("GET", path, false);
    xhr.send();
    if (error !== null) {
      var e = error;
      error = null;
      throw e;
    }
    return result;
  } : function () {};

  function isBrowser() {
    return (typeof document !== "undefined");
  }
}());
