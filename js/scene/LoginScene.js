(function () {
  "use strict";

  var HomeScene = require("../scene/HomeScene.js");
  var LoaderScene = require("../scene/LoaderScene.js");
  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");

  var account = require("../model/account.js");
  var FB = require("../model/login/FB.js");

  function LoginScene(gameMode) {
    var entities = [];
    var buttonFB, buttonDEV;

    this.load = function (assetLoader, done, failed) {
      assetLoader.loadBatch("/assets/batches/login.json")
        .then(function (batch) {
          entities.push(new GameEntity(batch.entities.logo));
          entities.push(buttonFB = new Button(batch.entities.facebook));
          if (gameMode === "debug") {
            entities.push(buttonDEV = new Button(batch.entities.developer));
          }
          done();
        })
        .catch(failed);
    };

    this.setup = function (toScene) {
      buttonFB.onPress(function () {
        FB.login()
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
      if (buttonDEV) {
        buttonDEV.onPress(function () {
          console.log("buttonDEV");
        });
      }
      return function (evt) {
        buttonFB.offerEvent(evt);
        if (buttonDEV) {
          buttonDEV.offerEvent(evt);
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
