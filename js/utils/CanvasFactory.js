(function () {
  "use strict";

  /**
   * Factory class for creating canvas elements.
   */
  function CanvasFactory () {}

  /**
   * Creates new canvas element with given width and height in pixels.
   */
  CanvasFactory.prototype.createElement = isBrowser() ? function (w, h) {
    var $canvas = document.createElement("canvas");
    $canvas.width = w;
    $canvas.height = h;
    return $canvas;
  } : function () {
    return {
      getContext: function () {
        return {};
      },
    };
  };

  /**
   * Disables image smoothing for given CanvasRenderingContext2D.
   */
  CanvasFactory.prototype.disableContextImageSmoothing = function (context) {
    context.mozImageSmoothingEnabled = false;
    context.oImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  };

  Object.freeze(CanvasFactory);

  function isBrowser() {
    return (typeof document !== "undefined");
  }

  module.exports = CanvasFactory;
}());
