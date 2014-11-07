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

    var ratio = 0.75;

    w.setBodyElement($canvas);
    w.addResizeListener(resize);

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

    function resize(width, height) {
      $canvas.width = width;
      $canvas.height = height;
      ratio = height / width;
      canvas.disableContextImageSmoothing(context);
    }
  }

  module.exports = GameCanvas;
}());
