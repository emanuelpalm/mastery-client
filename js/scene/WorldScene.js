(function () {
  "use strict";

  /**
   * Represents the game world.
   *
   * The scene is created with the current player's account object.
   */
  function WorldScene(account) {
    var entities = [];
  
    this.load = function (assetLoader, done, failed) {

    };

    this.setup = function (toScene, load) {
    };
  
    this.update = function (dt) {
      entities.forEach(function (e) {
        e.update(dt);
      });
    };
  
    this.record = function (camera) {
      entities.forEach(camera.record);
    };
  }

  module.exports = WorldScene;
}());

