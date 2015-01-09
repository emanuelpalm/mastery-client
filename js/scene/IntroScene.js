(function () {
  "use strict";

  var HomeScene = require("./HomeScene.js");
  var LoginScene = require("./LoginScene.js");
  var GameEntity = require("../game/GameEntity.js");

  var account = require("../model/account.js");
  var promise = require("../utils/promise.js");
  var FB = require("../model/login/FB.js");

  /**
   * The scene that fires up when the game is first started.
   *
   * Is instantiated with a game mode identifier. If the game mode is "debug",
   * then the appropriate measures are made for the client to be able to run
   * in stand-alone mode.
   */
  function IntroScene(gameMode) {
    var entities = [];
    var loader;

    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/intro.json")
        .then(function (batch) {
          entities.push(loader = new GameEntity(batch.loader));
          entities.push(new GameEntity(batch.logo));
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
        .catch(function (error) {
          console.log(error.stack);
          alert("Failed to authenticate.");
        });
      return function (evt) {
        if (evt.type === "popstate") {
          alert("Pop!");
        }
      };

      function determineAndLoadNextScene() {
        if (gameMode === "debug") {
          return load(new LoginScene(gameMode));
        }
        return FB.getLoginStatus()
          .then(function (response) {
            if (response.isLoggedIn) {
              return account.authenticate(response.auth)
                .then(function (account) {
                  return load(new HomeScene(account));
                }, function (error) {
                  FB.logout();
                  return promise.reject(error);
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
