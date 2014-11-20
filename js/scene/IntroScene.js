(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");

  function IntroScene(gameMode) {
    var logo = null;

    this.setup = function (loader, toScene) {
      loader.loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          logo = new GameEntity(batch.entities.logo);
        })
        .catch(function (e) {
          console.log(e.stack);
        });

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        toScene(loginScene);
      }, 2000);
    };

    this.update = function (dt) {
      if (logo) {
        logo.update(dt);
      }
    };

    this.record = function (camera) {
      if (logo) {
        camera.record(logo);
      }
    };
  }

  module.exports = IntroScene;
}());
