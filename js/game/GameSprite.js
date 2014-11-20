(function () {
  "use strict";

  /**
   * An in-game sprite.
   *
   * Sprites are created with typeData, which is data shared by all sprites of
   * the same type, and state, which is an integer identifying the state the
   * sprite is currently in.
   */
  function GameSprite (typeData, state) {
    state = state || 0;
    var bounds = {
      x: 0,
      y: 0,
      width: typeData.width,
      height: typeData.height,
    };

    /**
     * Acquires bounds.
     */
    this.getBounds = function () {
      return bounds;
    };

    /**
     * Acquires sprite image.
     */
    this.getImage = function () {
      return typeData.image;
    };

    /**
     * Sets sprite state.
     *
     * The state has to be a positive integer that refers to a valid sprite
     * state.
     */
    this.setState = function (state) {
      var xy = typeData.states[state];
      bounds.x = xy[0];
      bounds.y = xy[1];
    };
  }

  module.exports = GameSprite;
}());
