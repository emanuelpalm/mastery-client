(function () {
  "use strict";

  var canvas = require("../utils/canvas.js");

  /**
   * Records entities, which may later be rendered to screen using a GameCanvas.
   *
   * @class
   */
  function GameCamera(width, height) {
    var $canvas = canvas.createCanvasElement(width, height);
    var context = $canvas.getContext("2d");
    canvas.disableContextImageSmoothing(context);
    var bounds = {
      x: 0,
      y: 0,
      w: width,
      h: height,
    };

    /**
     * Records given recordable.
     *
     * @param  {Entity|GameCamera} recordable - Entity or GameCamera to record.
     */
    this.record = function (recordable) {
      if (recordable instanceof GameCamera) {
        // TODO: Handle camera recording.
      } else {
        // TODO: Handle entity recording.
      }
    };

    /**
     * Acuires the bounds of the camera recordings which are to be rendered.
     *
     * @returns {Object} Camera bounds.
     */
    this.getBounds = function () {
      return bounds;
    };

    /**
     * Sets the bounds of the camera recordings.
     *
     * The bounds object contains the four keys x, y, w and h, which indicate
     * x/y offset and width/heigt of the bounds.
     *
     * @param {Object} bounds - Target bounds.
     */
    this.setBounds = function (bounds) {
      bounds = bounds;
    };

    /**
     * Acquires canvas containing all previously recorded entities.
     *
     * @returns {HTMLCanvasElement} Canvas containing recorded entities.
     */
    this.getCanvasBuffer = function () {
      return $canvas;
    };
  }

  module.exports = GameCamera;
}());
