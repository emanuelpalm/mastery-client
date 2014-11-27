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
      assetLoader.loadBatch("/assets/batches/login.json")
        .then(function (batch) {
          entities.push(new GameEntity(batch.entities.logo));
          if (gameMode === "debug") {
            button = new Button(batch.entities.developer);
            auth = DEV;
          } else {
            button = new Button(batch.entities.facebook);
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
          .then(function (isLoggedIn, authResponse) {
            if (isLoggedIn) {
              return account.authenticate(authResponse)
                .then(function (account) {
                  toScene(new LoaderScene(new HomeScene(account)));
                });
            }
          })
          .catch(function (e) {
            console.log(e.stack); // TODO: Show nice error message to user.
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
