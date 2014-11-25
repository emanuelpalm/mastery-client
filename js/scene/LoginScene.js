(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");

  function LoginScene(gameMode) {
    var entities = [];

    this.setup = function (control) {
      control.getAssetLoader().loadBatch("/assets/batches/login.json")
        .then(function (batch) {
          var logo = new GameEntity(batch.entities.logo);
          logo.setSize(64, 64);
          logo.setPosition(128, 0);
          entities.push(logo);

          var facebook = new Button(batch.entities.facebook, function () {
            console.log("Pressed facebook button.");
          });
          entities.push(facebook);

          if (gameMode === "debug") {
            var developer = new Button(batch.entities.developer, function () {
              console.log("Pressed developer button.");
            });
            entities.push(developer);
          }
          control.ready();
        })
        .catch(control.panic);
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
