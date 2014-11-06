(function () {
  "use strict";

  var Window = require("./utils/Window.js");
  var Game = require("./game/Game.js");
  var IntroScene = require("./scene/IntroScene.js");

  var w = new Window();

  function main() {
    var game = null;
    var options = {
      $canvas: w.createElement("canvas"),
      scene: new IntroScene(),
    };

    try {
      game = new Game(options);

      w.setBodyElement(options.$canvas);
      w.addEventListener("resize", function (evt) {
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
      var $error = w.createElement("img");
      $error.id = "error";
      $error.src = "assets/graphics/error.gif";
      w.setBodyElement($error);
    }
  }
  w.addEventListener("load", main);

}());
