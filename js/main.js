(function () {
  "use strict";

  var context = require("./utils/context.js");
  var Game = require("./game/Game.js");
  var IntroScene = require("./scene/IntroScene.js");

  function main() {
    var game = null;
    var options = {
      $canvas: context.createElement("canvas"),
      scene: new IntroScene(),
    };

    try {
      game = new Game(options);

      context.setBodyElement(options.$canvas);
      context.addEventListener("resize", function (evt) {
        game.resize(evt.target.innerWidth, evt.target.innerHeight);
      });

      game.start();

    } catch (e) {
      if (game !== null) {
        game.stop();
      }
      displayErrorElement();
      throw e;
    }

    function displayErrorElement() {
      var $error = context.createElement("img");
      $error.id = "error";
      $error.src = "assets/graphics/error.gif";
      context.setBodyElement($error);
    }
  }
  context.addEventListener("load", main);

}());