(function () {
  "use strict";

  /**
   * Represents the current site user's site navigation history.
   */
  function History() {
    this.entries = {}; 
    if (isBrowser()) {
      window.location = (window.location + "").split("#")[0] + "#";
    }
    Object.seal(this);
  }

  /**
   * Registers function to be called when site user user history back command.
   *
   * The function is called with the state stored with the last pushState call.
   */
  History.prototype.addPopStateListener = isBrowser() ? function (f) {
    window.addEventListener("popstate", function (evt) {
        f(this.entries[evt.state]);
    }.bind(this));
  } : function () {};

  /**
   * Pushes arbitrary data as history state.
   */
  History.prototype.pushState = isBrowser() ? function (data, name, path) {
    this.entries[path] = data;
    window.history.pushState(path, name, path);
  } : function () {};

  function isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof window.history !== "undefined"
    );
  }

  module.exports = History;
}());

