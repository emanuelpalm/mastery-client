(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  function Button(type, onPress) {
    GameEntity.call(this, type);
    this.onPress = onPress;
  }
  Button.prototype = Object.create(GameEntity.prototype);
  Button.prototype.constructor = Button;

  Button.prototype.onEvent = function (evt) {
    console.log(evt);
  };

  module.exports = Button;
}());
