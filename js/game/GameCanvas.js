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
        width = Math.min(bounds.width, $cameraCanvas.width - x),
        height = Math.min(bounds.height, $cameraCanvas.height - y);

      context.drawImage(
        $cameraCanvas,
        x, y, width, height,
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
