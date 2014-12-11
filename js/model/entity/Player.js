(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  /**
   * A player.
   *
   * Player inherits GameEntity.
   */
  function Player(type) {
    GameEntity.call(this, type);
    this.callback = function () {};
    this.keyStates = { left: 0.0, up: 0.0, right: 0.0, down: 0.0 };
    this.direction = "south";
    this.isWalking = false;
  }
  Player.prototype = Object.create(GameEntity.prototype);
  Player.prototype.constructor = Player;

  /**
   * Offer opportunity to react to given event.
   */
  Player.prototype.offerEvent = function (evt) {
    switch (evt.type) {
    case "keydown":
      switch (evt.properties) {
      case 37: this.keyStates.left  = -1.0; break;
      case 38: this.keyStates.up    = -1.0; break;
      case 39: this.keyStates.right =  1.0; break;
      case 40: this.keyStates.down  =  1.0; break;
      }
      updateVelocity(this);
      updateWalkingAnimation(this);
      break;

    case "keyup":
      switch (evt.properties) {
      case 37: this.keyStates.left  = 0.0; break;
      case 38: this.keyStates.up    = 0.0; break;
      case 39: this.keyStates.right = 0.0; break;
      case 40: this.keyStates.down  = 0.0; break;
      }
      updateVelocity(this);
      updateWalkingAnimation(this);
      break;
    }

    function updateVelocity(player) {
      player.setVelocity(
        (player.keyStates.left + player.keyStates.right) * 50,
        (player.keyStates.up   + player.keyStates.down)  * 50
      );
    }
  };

  function updateWalkingAnimation(player) {
    var isWalking = true;
    var direction = player.direction;

    var bounds = player.getBounds();
    if (bounds.dy < 0) {
      direction = "north";

    } else if (bounds.dy > 0) {
      direction = "south";

    } else {
      if (bounds.dx < 0) {
        direction = "west";
        
      } else if (bounds.dx > 0) {
        direction = "east";

      } else {
        isWalking = false;
      }
    }
    if (direction !== player.direction || isWalking !== player.isWalking) {
      player.animation.setProgram(direction + ":" + ((isWalking) ? "move" : "idle"));
      player.direction = direction;
      player.isWalking = isWalking;
    }
  }

  Player.prototype.synchronize = function (data) {
    GameEntity.prototype.synchronize.call(this, data);
    updateWalkingAnimation(this);
  };
  module.exports = Player;
}());

