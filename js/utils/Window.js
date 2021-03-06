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

    Object.freeze(this);
  }

  /**
   * Creates a new HTML element with a given tag name.
   */
  Window.prototype.createElement = isBrowser() ? function (tagName) {
    return document.createElement(tagName);
  } : function () {
    return {};
  };

  /**
   * Removes all HTML elements in context body and inserts the given
   * element.
   */
  Window.prototype.setBodyElement = isBrowser() ? function ($element) {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild($element);
  } : function () {};

  /**
   * Registers function to be called when the window has loaded.
   */
  Window.prototype.addLoadListener = isBrowser() ? function (f) {
    window.addEventListener("load", function () {
      var $script = document.getElementById("mastery-script");
      f($script.getAttribute("data-mode"));
    });
  } : function (f) {
    f();
  };

  /**
   * Registers funciton to be called when the window is resized. The function is
   * also called immediately when registered.
   */
  Window.prototype.addResizeListener = isBrowser() ? function (f) {
    window.addEventListener("resize", function (evt) {
      f(evt.target.innerWidth, evt.target.innerHeight);
    });
    f(window.innerWidth, window.innerHeight);
  } : function () {};

  /**
   * Registers mouse event listener function.
   */
  Window.prototype.addMouseListener = isBrowser() ? function (f) {
    window.addEventListener("click", handleMouseEvent);
    window.addEventListener("mousedown", handleMouseEvent);
    window.addEventListener("mousemove", handleMouseEvent);

    function handleMouseEvent(evt) {
      f(evt.type, evt.clientX, evt.clientY);
    }
  } : function () {};

  /**
   * Registers function to be called when a keyboard key is pressed while the
   * window has focus.
   */
  Window.prototype.addKeyboardListener = isBrowser() ? function (f) {
    window.addEventListener("keydown", handleKeyboardEvent);
    window.addEventListener("keyup", handleKeyboardEvent);

    function handleKeyboardEvent(evt) {
      f(evt.type, evt.keyCode);
    }
  } : function () {};

  /**
   * Clears window of all visible elements and displays an error indicator.
   */
  Window.prototype.panic = isBrowser() ? function (e) {
    var $error = this.createElement("img");
    $error.id = "error";
    $error.src = "assets/graphics/error.png";
    this.setBodyElement($error);
    console.log(e.stack);
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

  Object.seal(Window.prototype);

  module.exports = Window;
}());
