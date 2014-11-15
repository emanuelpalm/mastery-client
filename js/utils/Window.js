(function () {
  "use strict";

  var instances = 0;

  /**
   * Encapsulates the browser DOM.
   *
   * The methods provided are guaranteed to exist even if the class is used
   * server-side. The methods will do nothing of significance, however.
   *
   * Note: Only one instance of this class may be created. Additional instances
   * will cause an exception to be thrown.
   */
  function Window() {
    if (instances++ > 0) {
      throw new Error("Only a single Window instance allowed.");
    }
  }

  /**
   * Creates a new HTML element.
   *
   * @param {string} tagName - Tag-name of element to create.
   * @return {HTMLElement} Created HTML element.
   */
  Window.prototype.createElement = isBrowser() ? function (tagName) {
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
  Window.prototype.setBodyElement = isBrowser() ? function ($element) {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild($element);
  } : function () {};

  /**
   * Registers function to be called when the window has loaded.
   *
   * @param  {Function} f - Function to call when the window has loaded.
   */
  Window.prototype.addLoadListener = isBrowser() ? function (f) {
    window.addEventListener("load", function () {
      f();
    });
  } : function (f) {
    f();
  };

  /**
   * Registers funciton to be called when the window is resized. The function is
   * also called immediately when registered.
   *
   * @param  {Function} f - Function to call on window resize.
   */
  Window.prototype.addResizeListener = isBrowser() ? function (f) {
    window.addEventListener("resize", function (evt) {
      f(evt.target.innerWidth, evt.target.innerHeight);
    });
    f(window.innerWidth, window.innerHeight);
  } : function () {};

  /**
   * Clears window of all visible elements and displays an error indicator.
   *
   * @param  {Error} e - Error causing panic.
   */
  Window.prototype.panic = isBrowser() ? function (e) {
    var $error = this.createElement("img");
    $error.id = "error";
    $error.src = "assets/graphics/error.png";
    this.setBodyElement($error);
    throw e;
  } : function (e) {
    throw e;
  };

  function isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      typeof document.body !== "undefined"
    );
  }

  module.exports = Window;
}());
