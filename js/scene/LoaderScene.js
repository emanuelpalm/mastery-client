(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var promise = require("../utils/promise.js");

  /**
   * Displays a loader while loading a given next scene.
   */
  function LoaderScene(nextScene) {
    var loader;

    this.load = function (assetLoader, done, failed) {
      assetLoader.loadBatch("/assets/batches/loader.json")
        .then(function (batch) {
          loader = new GameEntity(batch.entities.loader);
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene, load) {
      promise.starve([
        load(nextScene),
        promise.expire(1000),
      ])
      .then(function (nextScene) {
        loader.animation.setProgram("stop");
        promise.timeout(450).then(function () {
          toScene(nextScene);
        });
      })
      .catch(function () {
        console.log("Failed to load scene.");
      });
    };

    this.update = function (dt) {
      loader.update(dt);
    };

    this.record = function (camera) {
      camera.record(loader);
    };
  }

  module.exports = LoaderScene;
}());
