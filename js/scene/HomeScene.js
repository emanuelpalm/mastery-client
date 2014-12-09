(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var FileDialog = require("../utils/FileDialog.js");
  var Button = require("../model/entity/Button.js");
  var LoaderScene = require("./LoaderScene.js");
  var WorldScene = require("./WorldScene.js");

  /**
   * Represents the game home menu.
   *
   * The scene is created with an account object, which is required for the user
   * to be able to manages his/her account or join games.
   */
  function HomeScene(account) {
    var entities = [];
    var buttonAvatar, buttonPlay, avatar = null;
    var fileDialog;

    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/home.json")
        .then(function (batch) {
          fileDialog = new FileDialog();
          entities.push(new GameEntity(batch.frame));
          entities.push(buttonAvatar = new Button(batch.avatar));
          entities.push(buttonPlay = new Button(batch.play));
          done();
        }, failed);
    };
  
    this.setup = function (toScene) {
      buttonAvatar.onPress(function () {
        fileDialog.selectImage()
          .then(setAvatarImage)
          .then(function (a) {
            if (avatar) {
              entities.splice(entities.indexOf(avatar), 1);
            }
            a.setPosition(130, 34);
            entities.push(a);
            avatar = a;

          }, function (e) {
            console.log(e.stack);
            alert(e);
          });

        function setAvatarImage($image) {
          return account.setAvatarImage($image);
        }
      });
      buttonPlay.onPress(function () {
        toScene(new LoaderScene(new WorldScene(account)));
      });
      return function (evt) {
        buttonAvatar.offerEvent(evt);
        buttonPlay.offerEvent(evt);
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

  module.exports = HomeScene;
}());
