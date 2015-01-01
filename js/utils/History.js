(function () {
  "use strict";

  /**
   * Represents the current site user's site navigation history.
   */
  function History() {
    Object.freeze(this);
  }

  /**
   * Registers function to be called when site user user history back command.
   *
   * The function is called with the state stored with the last pushState call.
   */
  History.prototype.addPopStateListener = isBrowser() ? function (f) {
    window.addEventListener("popstate", function (evt) {
        f(evt.state);
    });
  } : function () {};

  /**
   * Pushes arbitrary data as history state.
   */
  History.prototype.pushState = isBrowser() ? function (data, path) {
    window.history.pushState(data, "", path);
  } : function () {};

  function isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof window.history !== "undefined"
    );
  }

  module.exports = History;
}());

