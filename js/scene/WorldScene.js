(function () {
  "use strict";

  var server = require("../model/server.js");

  /**
   * Represents the game world.
   *
   * The scene is created with the current player's account object.
   */
  function WorldScene(account) {
    var entities = [];
    var srv = {};
  
    this.load = function (assetLoader, done, failed) {
      server.connect(account)
        .then(function (s) {
          srv = s;
          done();
        }, failed);
    };

    this.setup = function () {
        
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

  module.exports = WorldScene;
}());
