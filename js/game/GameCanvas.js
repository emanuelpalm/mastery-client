(function () {
  "use strict";

  var canvas = require("../utils/canvas.js");

  /**
   * Manages a HTMLCanvasElement visible on screen.
   *
   * @class
   * @param {Window} w - Window in which canvas is to be visible.
   */
  function GameCanvas(w) {
    var $canvas = w.createElement("canvas");
    var context = $canvas.getContext("2d");

    var RATIO = 0.75;

    w.setBodyElement($canvas);
    w.addResizeListener(adjustCanvasSize);

    /**
     * Renders recordings captured by given camera.
     */
    this.render = function (camera) {
      var $cameraCanvas = camera.getCanvasBuffer();
      var bounds = camera.getBounds(),
        x = Math.min(bounds.x, $cameraCanvas.width, 0),
        y = Math.min(bounds.y, $cameraCanvas.height, 0),
        w = Math.min(bounds.w, $cameraCanvas.width - x, 0),
        h = Math.min(bounds.h * ratio, $cameraCanvas.height - y, 0);

      context.drawImage(
        $cameraCanvas,
        x, y, w, h,
        0, 0, $canvas.width, $canvas.height
      );
    };

    function adjustCanvasSize(width, height) {
      var left = 0;
      if (width * RATIO < height) {
        height = width * RATIO;
      } else {
        left = (width - (height / RATIO)) / 2;
        width = height / RATIO;
      }
      $canvas.style.left = left + "px";
      $canvas.width = width;
      $canvas.height = height;
      canvas.disableContextImageSmoothing(context);
    }
  }

  module.exports = GameCanvas;
}());
