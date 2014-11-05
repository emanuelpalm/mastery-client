(function () {
  "use strict";

  var GameLooper = require("./GameLooper.js");
  var looper = new GameLooper();

  function Game() {
    // TODO: Implement.
  }

  Game.prototype.getCanvas = function () {
    // TODO: Implement.
    return document.createElement("canvas");
  };

  Game.prototype.start = function () {
    looper.loop(function () {
      // TODO: Do something.
    });
  };

  module.exports = Game;
}());