(function () {
  "use strict";

  var LoginScene = require("./LoginScene.js");

  function IntroScene(gameMode) {
    var logo = null;

    this.setup = function (loader, toScene) {
      loader.loadBatch("/assets/batches/intro.json")
        .then(function (batch) {
          logo = batch.logo;
        })
        .catch(function (e) {
          console.log(e);
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
