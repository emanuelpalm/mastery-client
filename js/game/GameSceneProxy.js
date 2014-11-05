(function () {
  "use strict";

  /**
   * Manages transitions between scenes.
   *
   * @class
   */
  function GameSceneProxy(originScene) {
    var scene = originScene;
    this._getScene = function () {
      return scene;
    };
    this._setScene = function (nextScene) {
      scene = nextScene;
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

  module.exports = GameSceneProxy;

}());