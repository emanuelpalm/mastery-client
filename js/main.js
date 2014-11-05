(function () {
  "use strict";

  var Game = require("./game/Game.js");
  var IntroScene = require("./scene/IntroScene.js");

  function main() {
    try {
      var $canvas = createCanvasElement();
      var game = new Game({
        canvas: $canvas,
        scene: new IntroScene(),
      });
      setDocumentBody($canvas);
      game.start();

    } catch (e) {
      setDocumentBody(
        createErrorElement()
      );
      throw e;
    }
  }

  window.addEventListener("load", main);

  function createCanvasElement() {
    return document.createElement("canvas");
  }

  function setDocumentBody($element) {
    while (document.body.removeChild(document.body.firstChild));
    document.body.appendChild($element);
  }

  function createErrorElement() {
    var $error = document.createElement("img");
    $error.id = "error";
    $error.src = "assets/graphics/error.gif";
    return $error;
  }
}());