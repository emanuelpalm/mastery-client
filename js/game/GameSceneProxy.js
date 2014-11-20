(function () {
  "use strict";

  var GameSceneControl = require("./GameSceneControl.js");

  /**
   * Manages a current scene and its transitions to other scenes.
   *
   * @class
   */
  function GameSceneProxy(originScene) {
    var sceneControl = new GameSceneControl();
    var scene = {
      update: function () {},
      record: function () {},
    };

    sceneControl.panic = unhandledPanic;
    sceneControl.toScene = toScene;
    sceneControl.toScene(originScene);

    function toScene (nextScene) {
      sceneControl.onEvent = unhandledEvent;
      sceneControl.ready = function () {
        scene = nextScene;
      };
      nextScene.setup(sceneControl);
    }

    function unhandledEvent(evt) {
      console.log("Unhandled event: " + evt);
    }

    function unhandledPanic(error) {
      console.log("Unhandled panic: " + error);
    }

    /**
     * Updates current scene relative to given elapsed time since last update.
     */
    this.update = function (dt) {
      scene.update(dt);
    };

    /**
     * Records entities which are to be displayed at the next screen frame.
     */
    this.record = function (camera) {
      scene.record(camera);
    };

    /**
     * Notifies current scene about some occurred event.
     */
    this.notify = function (evt) {
      sceneControl.onEvent(evt);
    };
  }

  module.exports = GameSceneProxy;
}());
