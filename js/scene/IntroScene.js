(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");
  var promise = require("../utils/promise.js");

  function IntroScene(gameMode) {
    var entities = [];
    var loader;

    this.load = function (assetLoader, done, failed) {
      assetLoader.loadBatch("/assets/batches/intro.json")
        .then(function (batch) {

          loader = new GameEntity(batch.entities.loader);
          loader.setPosition(144, 150);
          entities.push(loader);

          entities.push(new GameEntity(batch.entities.logo));

          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene, load) {
      var loginScene = new LoginScene(gameMode);
      promise.starve([
        promise.timeout(2000),
        load(loginScene),
      ])
      .then(function () {
        loader.animation.setProgram("stop");
        promise.timeout(450).then(function () {
          toScene(loginScene);
        });
      })
      .catch(function () {
        console.log(arguments);
      });
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

  module.exports = IntroScene;
}());
