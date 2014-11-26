(function () {
  "use strict";

  var canvas = require("../utils/canvas.js");
  var GameEvent = require("./GameEvent.js");

  /**
   * Manages a HTMLCanvasElement visible on screen.
   *
   * @class
   */
  function GameCanvas(w) {
    var $canvas = w.createElement("canvas");
    var context = $canvas.getContext("2d");
    var canvasBounds;
    var cameraWidth = 320, cameraHeight = 240;

    var RATIO = 0.75;

    w.setBodyElement($canvas);
    w.addResizeListener(adjustCanvasSize);

    /**
     * Renders recordings captured by given camera.
     */
    this.render = function (camera) {
      context.clearRect(0, 0, $canvas.width, $canvas.height);

      var $cameraCanvas = camera.getCanvasBuffer();
      cameraWidth = $cameraCanvas.width;
      cameraHeight = $cameraCanvas.height;

      var bounds = camera.getBounds(),
        x = Math.min(bounds.x, cameraWidth, 0),
        y = Math.min(bounds.y, cameraHeight, 0),
        width = Math.min(bounds.width, cameraWidth - x),
        height = Math.min(bounds.height, cameraHeight - y);

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
      canvasBounds = { left: left, top: 0, width: width, height: height };
    }

    /**
     * Registers given function for receiving all canvas events.
     */
    this.onEvent = function (f) {
      w.addMouseListener(function (type, x, y) {
        x = (x - canvasBounds.left) / canvasBounds.width * cameraWidth;
        y = (y - canvasBounds.top) / canvasBounds.height * cameraHeight;
        f(new GameEvent(type, { x: x, y: y }));
      });
      w.addKeyboardListener(function (type, key) {
        f(new GameEvent(type, key));
      });
    };
      
    Object.seal(this);
  }

  module.exports = GameCanvas;
}());
