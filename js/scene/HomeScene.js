(function () {
  "use strict";

  var GameEntity = require("../game/GameEntity.js");
  var Button = require("../model/entity/Button.js");

  /**
   * Represents the game home menu.
   *
   * The scene is created with an account object, which is required for the user
   * to be able to manages his/her account or join games.
   */
  function HomeScene(acc) {
    var account = acc;
    var entities = [];
    var avatar, play;

    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/home.json")
        .then(function (batch) {
          entities.push(new GameEntity(batch.frame));
          entities.push(avatar = new Button(batch.avatar));
          entities.push(play = new Button(batch.play));
          done();
        }, failed);
    };
  
    this.setup = function (toScene, load) {
  
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
