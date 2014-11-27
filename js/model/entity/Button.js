(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  /**
   * A clickable button.
   *
   * Button inherits GameEntity.
   */
  function Button(type) {
    GameEntity.call(this, type);
    this.callback = function () {};
  }
  Button.prototype = Object.create(GameEntity.prototype);
  Button.prototype.constructor = Button;

  /**
   * Sets button activation callback.
   */
  Button.prototype.onPress = function (f) {
    this.callback = f;
  };

  /**
   * Offer button opportunity to react to given event.
   */
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
