(function () {
  "use strict";

  var HomeScene = require("./HomeScene.js");
  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");

  var account = require("../model/account.js");
  var promise = require("../utils/promise.js");
  var FB = require("../model/login/FB.js");

  function IntroScene(gameMode) {
    var entities = [];
    var loader;

    this.load = function (assetLoader, done, failed) {
      assetLoader.loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          entities.push(loader = new GameEntity(batch.entities.loader));
          entities.push(new GameEntity(batch.entities.logo));
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene, load) {
      promise.starve([
        determineAndLoadNextScene(),
        promise.expire(2000),
      ])
      .then(function (nextScene) {
        loader.animation.setProgram("stop");
        promise.timeout(450).then(function () {
          toScene(nextScene);
        });
      })
      .catch(function () {
        console.log("Failed to setup application.");
      });

      function determineAndLoadNextScene() {
        return FB.getLoginStatus()
          .then(function (isLoggedIn, authResponse) {
            if (isLoggedIn) {
              return account.authenticate(authResponse)
                .then(function (account) {
                  return load(new HomeScene(account));
                });
            }
            return load(new LoginScene(gameMode));
          });
      }
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
