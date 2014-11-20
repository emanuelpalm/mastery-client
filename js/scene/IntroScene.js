(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");

  function IntroScene(gameMode) {
    var logo = null;

    this.setup = function (control) {
      control.getAssetLoader().loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          logo = batch.entities.logo;
          control.ready();
        })
        .catch(control.panic);

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        control.toScene(loginScene);
      }, 2000);
    };

    this.update = function (dt) {
      logo.update(dt);
    };

    this.record = function (camera) {
      camera.record(logo);
    };
  }

  module.exports = IntroScene;
}());
