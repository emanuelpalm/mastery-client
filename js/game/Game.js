(function () {
  "use strict";

  var GameLooper = require("./GameLooper.js");
  var GameSceneProxy = require("./GameSceneProxy.js");
  var GameCanvas = require("./GameCanvas.js");

  /**
   * Represents the entirety of the game.
   *
   * @class
   */
  function Game(properties) {
    properties.looper = new GameLooper();
    properties.sceneProxy = new GameSceneProxy(properties.scene);
    properties.gameCanvas = new GameCanvas(properties.$canvas);

    this._getProperties = function () {
      return properties;
    };
  }

  /**
   * Starts execution of game.
   */
  Game.prototype.start = function () {
    var p = this._getProperties();

    this.resize(p.$canvas.offsetWidth, p.$canvas.offsetHeight);
    p.looper.loop(function (dt) {
      p.sceneProxy.update(dt);
      p.sceneProxy.render(null); // TODO: Pass on camera object.
      p.gameCanvas.render(null); // TODO: Pass on camera object.
      // TODO: Anything else? Handle events?
    });
  };

  /**
   * Stops execution of game.
   */
  Game.prototype.stop = function () {
    this._getProperties().looper.stop();
  }

  /**
   * Resizes game canvas.
   *
   * @param  {integer} width  - Target width, in pixels.
   * @param  {integer} height - Target height, in pixels.
   */
  Game.prototype.resize = function (width, height) {
    this._getProperties().gameCanvas.resize(width, height);
  };

  module.exports = Game;
}());