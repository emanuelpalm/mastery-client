(function () {
  "use strict";

  var GameLooper = require("./GameLooper.js");
  var GameSceneProxy = require("./GameSceneProxy.js");

  /**
   * Represents the entirety of the game.
   *
   * @class
   */
  function Game(properties) {
    properties.looper = new GameLooper();
    properties.sceneProxy = new GameSceneProxy(properties.scene);

    this._getProperties = function () {
      return properties;
    };
  }

  /**
   * Starts execution of game.
   */
  Game.prototype.start = function () {
    var p = this._getProperties();

    p.looper.loop(function (dt) {
      p.sceneProxy.update(dt);
      p.sceneProxy.render(null); // TODO: Pass on camera object.

      // TODO: Anything else? Handle events?
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