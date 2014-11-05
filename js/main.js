(function () {
  "use strict";

  var context = require("./utils/context.js");
  var Game = require("./game/Game.js");
  var IntroScene = require("./scene/IntroScene.js");

  function main() {
    try {
      var $canvas = context.createElement("canvas");
      var game = new Game({
        canvas: $canvas,
        scene: new IntroScene(),
      });
      context.setBodyElement($canvas);
      game.start();

    } catch (e) {
      var $error = context.createElement("img");
      $error.id = "error";
      $error.src = "assets/graphics/error.gif";
      context.setBodyElement($error);
      throw e;
    }
  }
  window.addEventListener("load", main);

}());