(function () {
  "use strict";

  /**
   * Manages rendering.
   *
   * @class
   */
  function GameCanvas($onScreenCanvas) {
    var $offScreenCanvas = $onScreenCanvas.cloneNode(false);
    var ctxOn = $onScreenCanvas.getContext("2d");
    var ctxOff = $offScreenCanvas.getContext("2d");

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

    /**
     * Resizes canvas to the size given in pixels.
     */
    this.resize = function (width, height) {
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
