(function () {
  "use strict";

  var GameLooper = require("./GameLooper.js");

  /**
   * Represents the entirety of the game.
   *
   * @class
   */
  function Game(properties) {
    properties.looper = new GameLooper();

    this._getProperties = function () {
      return properties;
    };
  }

  /**
   * Starts execution of game.
   */
  Game.prototype.start = function () {
    this._getProperties().looper.loop(function (dt) {
      // TODO: Do something.
    });
  };

  /**
   * Stops execution of game.
   */
  Game.prototype.stop = function () {
    this._getProperties().looper.stop();
  }

  module.exports = Game;
}());