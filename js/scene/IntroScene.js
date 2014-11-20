(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");

  function IntroScene(gameMode) {
    var entities = {};

    this.setup = function (control) {
      control.getAssetLoader().loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          entities = batch.entities;
          entities.loader.setPosition(152, 150);
          control.ready();
        })
        .catch(control.panic);

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        control.toScene(loginScene);
      }, 2000);
    };

    this.update = function (dt) {
      entities.logo.update(dt);
      entities.loader.update(dt);
    };

    this.record = function (camera) {
      camera.record(entities.logo);
      camera.record(entities.loader);
    };
  }

  module.exports = IntroScene;
}());
