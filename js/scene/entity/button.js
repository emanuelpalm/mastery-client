(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  function Button(type, onPress) {
    this.prototype = new GameEntity(type);
    this.onPress = onPress;
  }
