(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");

  function LoginScene(gameMode) {
    var entities = [];
    var facebook, developer;

    this.load = function (assetLoader, done, failed) {
      assetLoader.loadBatch("/assets/batches/login.json")
        .then(function (batch) {
          var logo = new GameEntity(batch.entities.logo);
          logo.setPosition(96, 0);
          entities.push(logo);

          facebook = new Button(batch.entities.facebook);
          entities.push(facebook);

          if (gameMode === "debug") {
            developer = new Button(batch.entities.developer);
            entities.push(developer);
          }
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene, load) {
      // TODO: Implement.
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

  module.exports = LoginScene;
}());
