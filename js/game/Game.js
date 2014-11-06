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
    var looper = new GameLooper();
    var sceneProxy = new GameSceneProxy(properties.scene);
    var gameCanvas = new GameCanvas(properties.$canvas);

    /**
     * Starts execution of game.
     */
    this.start = function () {
      this.resize(
        properties.$canvas.offsetWidth,
        properties.$canvas.offsetHeight
      );

      looper.loop(function (dt) {
        sceneProxy.update(dt);
        sceneProxy.render(null); // TODO: Pass on camera object.
        gameCanvas.render(null); // TODO: Pass on camera object.
        // TODO: Anything else? Handle events?
      });
    };

    /**
     * Stops execution of game.
     */
    this.stop = function () {
      looper.stop();
    };

    /**
     * Resizes game canvas.
     *
     * @param  {integer} width  - Target width, in pixels.
     * @param  {integer} height - Target height, in pixels.
     */
    this.resize = function (width, height) {
      gameCanvas.resize(width, height);
    };
  }

  module.exports = Game;
}());
