(function () {
  "use strict";

  var Game = require("./game/game.js");
  var IntroScene = require("./scene/intro_scene.js");

  function main() {
    var game = new Game(new IntroScene());
    var $canvas = game.getCanvas();
    show($canvas);
    game.start();
  }

  window.addEventListener("load", main);

  function show(element) {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(element);
  }
}());
