(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");

  function IntroScene(gameMode) {
    var entities = [];
    var loader;

    this.setup = function (control) {
      load(control.getAssetLoader(), control.ready, control.panic);

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        loader.animation.setProgram("stop");

        setTimeout(function () {
          control.toScene(loginScene);
        }, 450);

      }, 2000);
    };

    function load(assetLoader, ready, panic) {
      assetLoader.loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          loader = new GameEntity(batch.entities.loader);
          loader.setPosition(144, 150);
          entities.push(loader);

          entities.push(new GameEntity(batch.entities.logo));

          ready();
        })
        .catch(panic);
    }

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
