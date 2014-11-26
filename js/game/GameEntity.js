(function () {
  "use strict";

  var GameAnimation = require("./GameAnimation.js");
  var GameSprite = require("./GameSprite.js");

  /**
   * An in-game entity.
   *
   * An entity is anything which may be populate a game scene, such as a player,
   * a button, a map, etc.
   *
   * Entities are created with type data, which determines the its type.
   */
  function GameEntity(type) {
    this.type = type;
    this.animation = (type.animation) ? new GameAnimation(type.animation) : null;
    this.sprite = (type.sprite) ? new GameSprite(type.sprite) : null;
    this.bounds = {
      x: type.bounds.x,
      y: type.bounds.y,
      dx: type.bounds.dx || 0.0,
      dy: type.bounds.dy || 0.0,
      width: type.bounds.width,
      height: type.bounds.height,
    };
  }

  /**
   * Updates entity position in relation to elapsed time.
   */
  GameEntity.prototype.update = function (dt) {
    this.bounds.x += this.bounds.dx * dt;
    this.bounds.y += this.bounds.dy * dt;
    if (this.animation !== null && this.sprite !== null) {
      if (this.animation.update(dt)) {
        this.sprite.setState(this.animation.getFrame());
      }
    }
  };

  /**
   * Acquires sprite, if any, representing entity.
   */
  GameEntity.prototype.getSprite = function () {
    return this.sprite;
  };

  /**
   * Gets bounds, which is a map of x/y coordinates and with/height.
   */
  GameEntity.prototype.getBounds = function () {
    return this.bounds;
  };

  /**
   * Sets entity position.
   */
  GameEntity.prototype.setPosition = function (x, y) {
    this.bounds.x = x;
    this.bounds.y = y;
  };

  /**
   * Sets entity velocity.
   */
  GameEntity.prototype.setVelocity = function (dx, dy) {
    this.bounds.dx = dx;
    this.bounds.dy = dy;
  };

  /**
   * Sets entity size.
   */
  GameEntity.prototype.setSize = function (width, height) {
    this.bounds.width = width;
    this.bounds.height = height;
  };

  /**
   * Determine if this entity intersects with given other entity, bounds or
   * point.
   */
  GameEntity.prototype.intersects = function (other) {
    var a = this.getBounds(), b;
    if (other instanceof GameEntity) {
      b = other.getBounds();
    } else {
      b = other;
    }
    if (!a || !b || isNaN(b.x) || isNaN(b.y)) {
      return false;
    }
    return (!(a.x + (a.width | 0) < b.x || b.x + (b.width | 0) < a.x ||
                a.y + (a.height | 0) < b.y || b.y + (b.height | 0) < a.y));
  };

  module.exports = GameEntity;
}());
