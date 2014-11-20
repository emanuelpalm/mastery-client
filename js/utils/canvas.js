/**
 * Contains helper functions for creating and managing HTMLCanvasElements.
 *
 * @module utils/canvas
 */
(function () {
  "use strict";

  /**
   * Creates new canvas element.
   *
   * @param  {integer} width - Canvas width in pixels.
   * @param  {integer} height - Canvas height in pixels.
   * @return {HTMLCanvasElement} Canvas element.
   */
  exports.createCanvasElement = isBrowser() ? function (width, height) {
    var $canvas = document.createElement("canvas");
    $canvas.width = width;
    $canvas.height = height;
    return $canvas;
  } : function () {
    return {
      getContext: function () {
        return {};
      },
    };
  };

  /**
   * Disabled image smoothing for given CanvasRenderingContext2D.
   *
   * @param  {CanvasRenderingContext2D } context - Target context.
   */
  exports.disableContextImageSmoothing = function (context) {
    context.mozImageSmoothingEnabled = false;
    context.oImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  };

  Object.freeze(exports);

  function isBrowser() {
    return (typeof document !== "undefined");
  }
}());
