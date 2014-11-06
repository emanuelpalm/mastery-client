(function () {
  "use strict";

  /**
   * Manages rendering.
   *
   * @class
   */
  function GameCanvas(w) {
    var $onScreenCanvas = w.createElement("canvas");
    var $offScreenCanvas = w.createElement("canvas");
    var ctxOn = $onScreenCanvas.getContext("2d");
    var ctxOff = $offScreenCanvas.getContext("2d");

    w.setBodyElement($onScreenCanvas);
    w.addResizeListener(resize);

    /**
     * Renders recordings captured by given camera.
     */
    this.render = function (camera) {
      // TODO: Draw camera recordings.
      ctxOff.fillStyle = "#2212f2";
      ctxOff.fillRect(10, 10, 100, 100);

      ctxOn.drawImage(
        $offScreenCanvas,
        0, 0, $onScreenCanvas.width, $onScreenCanvas.height
      );
    };

    function resize(width, height) {
      $onScreenCanvas.setAttribute("width", width);
      $onScreenCanvas.setAttribute("height", height);

      $offScreenCanvas.setAttribute("height", 320 * (height / width));

      disableImageSmoothing(ctxOff);
      disableImageSmoothing(ctxOn);
    };

    function disableImageSmoothing(ctx) {
      ctx.mozImageSmoothingEnabled = false;
      ctx.oImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
    }
  }

  module.exports = GameCanvas;
}());