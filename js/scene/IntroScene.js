(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");

  function IntroScene(gameMode) {
    var logo = null;

    this.setup = function (loader, toScene) {
      loader.loadBatch("scenes/intro.json", function (batch) {
        logo = batch.logo;
      });

      var loginScene = new LoginScene(gameMode);
      setTimeout(function () {
        toScene(loginScene);
      }, 2000);
    };

    this.update = function (dt) {
      //logo.update(dt);
    };

    this.record = function (camera) {
      //camera.record(logo);
    };
  }

  module.exports = IntroScene;
}());
