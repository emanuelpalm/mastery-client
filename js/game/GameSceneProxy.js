(function () {
  "use strict";

  var GameAssetLoader = require("./GameAssetLoader.js");

  /**
   * Manages a current scene and its transitions to other scenes.
   *
   * @class
   */
  function GameSceneProxy(originScene) {
    var loader = new GameAssetLoader("/assets/");

    var eventCallback = null;
    var scene = null;
    toScene(originScene);

    /**
     * Function passed on to a scene during setup in order to allow it to set up
     * transitions to other scenes.
     *
     * @param  {Scene} nextScene - Scene to transition to.
     */
    function toScene(nextScene) {
      scene = nextScene;
      eventCallback = scene.setup(loader, toScene);
    }

    /**
     * Updates current scene relative to given elapsed time since last update.
     *
     * @param {double} dt Time elapsed since last update.
     */
    this.update = function (dt) {
      scene.update(dt);
    };

    /**
     * Records entities which are to be displayed at the next screen frame.
     *
     * @param {GameCamera} camera Camera used for recording scene entities.
     */
    this.record = function (camera) {
      scene.record(camera);
    };

    /**
     * Notifies current scene about some occurred event.
     *
     * @param  {GameEvent} evt - Event to pass on to scene.
     */
    this.notify = function (evt) {
      eventCallback(evt);
    };
  }

  module.exports = GameSceneProxy;
}());
