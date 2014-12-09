(function () {
  "use strict";

  var HomeScene = require("../scene/HomeScene.js");
  var LoaderScene = require("../scene/LoaderScene.js");
  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");

  var account = require("../model/account.js");
  var FB = require("../model/login/FB.js");
  var DEV = require("../model/login/DEV.js");

  /**
   * Login dialog.
   *
   * If the game mode is set to "debug", then only debug authentication is made
   * available.
   */
  function LoginScene(gameMode) {
    var entities = [];
    var button, auth;

    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/login.json")
        .then(function (batch) {
          entities.push(new GameEntity(batch.logo));
          if (gameMode === "debug") {
            button = new Button(batch.developer);
            auth = DEV;
          } else {
            button = new Button(batch.facebook);
            auth = FB;
          }
          entities.push(button);
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene) {
      button.onPress(function () {
        auth.login()
          .then(function (response) {
            if (response.isLoggedIn) {
              return account.authenticate(response.auth)
                .then(function (account) {
                  toScene(new LoaderScene(new HomeScene(account)));
                });
            }
          })
          .catch(function (e) {
            console.log(e.stack);
            alert("Failed to authenticate."); // TODO: Nicer error message.
          });
      });
      return function (evt) {
        button.offerEvent(evt);
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
