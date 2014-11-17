(function () {
  "use strict";

  var Window = require("./utils/Window.js");
  var Game = require("./game/Game.js");
  var IntroScene = require("./scene/IntroScene.js");

  var w = new Window();

  function main(mode) {
    var game = null;
    try {
      game = new Game({
        window: w,
        originScene: new IntroScene(mode),
      });
      game.start();

    } catch (e) {
      if (game !== null) {
        game.stop();
      }
      w.panic(e);
    }
  }
  w.addLoadListener(main);

}());
