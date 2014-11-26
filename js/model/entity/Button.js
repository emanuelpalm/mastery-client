(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  function Button(type) {
    GameEntity.call(this, type);
    this.callback = function () {};
  }
  Button.prototype = Object.create(GameEntity.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.onPress = function (f) {
    this.callback = f;
  };

  Button.prototype.offerEvent = function (evt) {
    switch (evt.type) {
    case "mousedown":
      if (this.intersects(evt.properties)) {
        this.callback();
      }
      break;

    case "mousemove":
      if (this.animation) {
        if (this.intersects(evt.properties)) {
          this.animation.setProgram("hover");
        } else {
          this.animation.setProgram("default");
        }
      }
      break;
    }
  };

  module.exports = Button;
}());
