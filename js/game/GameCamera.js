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
     * Clears camera.
     */
    this.clear = function () {
      context.clearRect(0, 0, $canvas.width, $canvas.height);
    };

    /**
     * Records given entity.
     */
    this.record = function (entity) {
      var sprite = entity.getSprite();
      if (!sprite) {
        return;
      }
      var cameraBounds = entity.getBounds();
      var spriteBounds = sprite.getBounds();
      context.drawImage(
        sprite.getImage(),
        spriteBounds.x, spriteBounds.y, spriteBounds.width, spriteBounds.height,
        cameraBounds.x, cameraBounds.y, cameraBounds.width, cameraBounds.height
      );
    };

    /**
     * Acuires the bounds of the camera recordings which are to be rendered.
     */
    this.getBounds = function () {
      return bounds;
    };

    /**
     * Sets the bounds of the camera recordings.
     *
     * The bounds object contains the four keys x, y, w and h, which indicate
     * x/y offset and width/heigt of the bounds.
     */
    this.setBounds = function (b) {
      bounds = b;
    };

    /**
     * Sets camera position.
     */
    this.setPosition = function (x, y) {
      bounds.x = x;
      bounds.y = y;
    };

    /**
     * Acquires canvas containing all previously recorded entities.
     */
    this.getCanvasBuffer = function () {
      return $canvas;
    };

    Object.seal(this);
  }

  module.exports = GameCamera;
}());
