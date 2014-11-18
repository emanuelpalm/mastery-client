(function () {
  "use strict";

  /**
   * Acquires target using HTTP GET.
   *
   * Target may either be a URL string, an array of URLs, or a map or URLs.
   *
   * The function returns a promise.
   */
  exports.get = function (target) {
    if (target instanceof String) {
      return getOne(target);
    }
    if (target instanceof Array) {
      return getArray(target);
    }
    if (target instanceof Object) {
      return getMap(target);
    }
    throw new Error("Target is not a String, Array or Object.");
  };

  function getOne(target) {

  }

  function getArray(target) {

  }

  function getMap(target) {

  }

}());
