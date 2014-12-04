(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  /**
   * Allows an HTMLImageElement to be treated as a GameEntity.
   *
   * Image inherits GameEntity.
   */
  function Image(element) {
    GameEntity.call(this, {
      sprite: {
        image: element,
        width: element.width,
        height: element.height,
        states: [
          [0, 0],
        ],
      },
      bounds: {
        x: 0,
        y: 0,
        width: element.width,
        height: element.height,
      },
    });
    this.callback = function () {};
  }
  Image.prototype = Object.create(GameEntity.prototype);
  Image.prototype.constructor = Image;

  module.exports = Image;
}());
