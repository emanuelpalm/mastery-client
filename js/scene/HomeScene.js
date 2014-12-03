(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");
  var Image = require("../model/entity/Image.js");

  /**
   * Represents the game home menu.
   *
   * The scene is created with an account object, which is required for the user
   * to be able to manages his/her account or join games.
   */
  function HomeScene(acc) {
    var account = acc;
    var entities = [];
    var buttonAvatar, buttonPlay, avatar = null;
    var uploader;

    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/home.json")
        .then(function (batch) {
          uploader = acc.getAvatarUploader();
          entities.push(new GameEntity(batch.frame));
          entities.push(buttonAvatar = new Button(batch.avatar));
          entities.push(buttonPlay = new Button(batch.play));
          done();
        }, failed);
    };
  
    this.setup = function (toScene, load) {
      buttonAvatar.onPress(function () {
        uploader.openImageDialog()
          .then(function (image) {
            if (!image) {
              return;
            }
            if (avatar) {
              entities.splice(entities.indexOf(avatar), 1);
            }
            entities.push(avatar = new Image(image));
            avatar.setPosition(130, 34);

          }, function (e) {
            console.log(e.stack);
            alert(e);
          });
      });
      buttonPlay.onPress(function () {
        console.log("pla");
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
