(function () {
  "use strict";

  /**
   * An in-game entity.
   *
   * An entity is anything which may be populate a game scene, such as a player,
   * a button, a map, etc.
   *
   * Entities are created with typeData, which is data shared by all entities of
   * the same type, and state, which is the unique state of the particular
   * entity.
   */
  function GameEntity(typeData, state) {
    if (!state) {
      state = Object.create(null);
    }
    if (!state.bounds) {
      state.bounds = {
        x: typeData.bounds.x,
        y: typeData.bounds.y,
        width: typeData.bounds.width,
        height: typeData.bounds.height,
        dx: typeData.bounds.dx || 0.0,
        dy: typeData.bounds.dy || 0.0,
      };
    }
    this._getTypeData = function () {
      return typeData;
    };
    this._getState = function () {
      return state;
    };
  }

  /**
   * Updates entity position in relation to elapsed time.
   */
  GameEntity.prototype.update = function (dt) {
    var state = this._getState();
    state.bounds.x += state.bounds.dx * dt;
    state.bounds.y += state.bounds.dy * dt;
  };

  /**
   * Acquires sprite, if any, representing entity.
   */
  GameEntity.prototype.getSprite = function () {
    return this._getTypeData().sprite;
  };

  /**
   * Gets bounds, which is a map of x/y coordinates and with/height.
   */
  GameEntity.prototype.getBounds = function () {
    return this._getState().bounds;
  };

  module.exports = GameEntity;
}());
