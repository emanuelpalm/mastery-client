(function () {
  "use strict";

  var canvas = require("../utils/canvas.js");

  /**
   * Records entities, which may later be rendered to screen using a GameCanvas.
   *
   * @class
   */
  function GameCamera(width, height) {
    var bounds = {
      x: 0,
      y: 0,
      width: width || 320,
      height: height || 240,
    };
    var $canvas = canvas.createCanvasElement(bounds.width, bounds.height);
    var context = $canvas.getContext("2d");
    canvas.disableContextImageSmoothing(context);

    /**
     * Records given entity.
     *
     * @param  {GameEntity} entity - Entity to record.
     */
    this.record = function (entity) {
      var cameraBounds = entity.getBounds();
      var spriteBounds = entity.getSprite().bounds;
      context.drawImage(
        entity.getSprite().image,
        spriteBounds.x, spriteBounds.y, spriteBounds.width, spriteBounds.height,
        cameraBounds.x, cameraBounds.y, cameraBounds.width, cameraBounds.height
      );
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
