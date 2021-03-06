(function () {
  "use strict";

  var GameLooper = require("./GameLooper.js");
  var GameSceneProxy = require("./GameSceneProxy.js");
  var GameCanvas = require("./GameCanvas.js");
  var GameCamera = require("./GameCamera.js");

  /**
   * Represents the entirety of the game.
   *
   * @class
   */
  function Game(properties) {
    var looper = new GameLooper();
    var canvas = new GameCanvas(properties.window);
    var sceneProxy = new GameSceneProxy(properties.originScene, handlePanic);

    function handlePanic(error) {
      properties.window.panic(error);
    }

    /**
     * Starts execution of game.
     */
    this.start = function () {
      var camera = new GameCamera();

      canvas.onEvent(sceneProxy.notify);

      looper.loop(function (dt) {
        camera.clear();

        sceneProxy.update(dt);
        sceneProxy.record(camera);
        canvas.render(camera);
      });
    };

    /**
     * Stops execution of game.
     */
    this.stop = function () {
      looper.stop();
    };

    Object.seal(this);
  }

  module.exports = Game;
}());
