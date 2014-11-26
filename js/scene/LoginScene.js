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
          entities.push(new GameEntity(batch.entities.logo));
          entities.push(facebook = new Button(batch.entities.facebook));
          if (gameMode === "debug") {
            entities.push(developer = new Button(batch.entities.developer));
          }
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene, load) {
      facebook.onPress(function () {
        console.log("facebook");
      });
      if (developer) {
        developer.onPress(function () {
          console.log("developer");
        });
      }
      return function (evt) {
        facebook.offerEvent(evt);
        if (developer) {
          developer.offerEvent(evt);
        }
      };
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
