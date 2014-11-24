(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");

  function IntroScene(gameMode) {
    var entities = {};

    this.setup = function (control) {
      control.getAssetLoader().loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          entities.loader = new GameEntity(batch.entities.loader);
          entities.loader.setPosition(144, 150);
          entities.logo = new GameEntity(batch.entities.logo);
          control.ready();
        })
        .catch(control.panic);

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        control.toScene(loginScene);
      }, 2000);
    };

    this.update = function (dt) {
      entities.logo.update(dt);
      entities.loader.update(dt);
    };

    this.record = function (camera) {
      camera.record(entities.logo);
      camera.record(entities.loader);
    };
  }

  module.exports = IntroScene;
}());
