(function () {
  "use strict";

  /**
   * An in-game sprite.
   *
   * Sprites are created with typeData, which is data shared by all sprites of
   * the same type, and state, which is an integer identifying the state the
   * sprite is currently in.
   */
  function GameSprite (type) {
    this.type = type;
    this.bounds = {
      x: 0,
      y: 0,
      width: type.width,
      height: type.height,
    };
    this.setState(0);
  }

  /**
   * Acquires bounds.
   */
  GameSprite.prototype.getBounds = function () {
    return this.bounds;
  };

  /**
   * Acquires sprite image.
   */
  GameSprite.prototype.getImage = function () {
    return this.type.image;
  };

  /**
   * Sets sprite state.
   *
   * The state has to be a positive integer that refers to a valid sprite
   * state.
   */
  GameSprite.prototype.setState = function (state) {
    var xy = this.type.states[state];
    this.bounds.x = xy[0];
    this.bounds.y = xy[1];
  };

  module.exports = GameSprite;
}());
