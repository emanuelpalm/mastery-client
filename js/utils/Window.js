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

  function isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      typeof document.body !== "undefined"
    );
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
   * Adds new event listener to global context.
   *
   * @param  {string} type - Event type.
   * @param  {Function} f - Callback fired on event.
   */
  Window.prototype.addEventListener = isBrowser() ? function (type, f) {
    window.addEventListener(type, f);
  } : function () {};

  module.exports = Window;
}());
