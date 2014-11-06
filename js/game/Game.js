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
    var sceneProxy = new GameSceneProxy(properties.originScene);
    var canvas = new GameCanvas(properties.window);

    /**
     * Starts execution of game.
     */
    this.start = function () {
      looper.loop(function (dt) {
        sceneProxy.update(dt);
        sceneProxy.render(null); // TODO: Pass on camera object.
        canvas.render(null); // TODO: Pass on camera object.
        // TODO: Anything else? Handle events?
      });
    };

    /**
     * Stops execution of game.
     */
    this.stop = function () {
      looper.stop();
    };
  }

  module.exports = Game;
}());