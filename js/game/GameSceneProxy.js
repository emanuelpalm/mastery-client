(function () {
  "use strict";

  /**
   * Manages a current scene and its transitions to other scenes.
   *
   * @class
   */
  function GameSceneProxy(originScene) {
    var scene = null;
    this._getScene = function () {
      return scene;
    };

    var eventCallback = null;
    this._getEventCallback = function () {
      return eventCallback;
    };

    toScene(originScene);

    /**
     * Function passed on to a scene during setup in order to allow it to set up
     * transitions to other scenes.
     *
     * @param  {Scene} nextScene - Scene to transition to.
     */
    function toScene(nextScene) {
      scene = nextScene;
      eventCallback = scene.setup(toScene);
    }
  }

  /**
   * Updates current scene relative to given elapsed time since last update.
   *
   * @param {double} dt Time elapsed since last update.
   */
  GameSceneProxy.prototype.update = function (dt) {
    this._getScene().update(dt);
  };

  /**
   * Updates current scene relative to given elapsed time since last update.
   *
   * @param {GameCamera} camera Camera used for recording scene entities.
   */
  GameSceneProxy.prototype.render = function (camera) {
    this._getScene().render(camera);
  };

  /**
   * Notifies current scene about some occurred event.
   *
   * @param  {GameEvent} evt - Event to pass on to scene.
   */
  GameSceneProxy.prototype.notify = function (evt) {
    this._getEventCallback()(evt);
  };

  module.exports = GameSceneProxy;
}());