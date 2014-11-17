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
  function Entity(typeData, state) {
    if (!state) {
      state = {
        bounds: typeData.bounds,
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
  Entity.prototype.update = function (dt) {
    var state = this._getState();
    if (state.bounds) {
      state.bounds.x += state.bounds.dx * dt;
      state.bounds.y += state.bounds.dy * dt;
    }
  };

  /**
   * Acquires sprite, if any, representing entity.
   */
  Entity.prototype.getSprite = function () {
    return this._getTypeData().sprite;
  };

  /**
   * Gets bounds, which is a map of x/y coordinates and with/height.
   */
  Entity.prototype.getBounds = function () {
    var bounds = this._getState().bounds;
    return bounds ? bounds : { x: 0, y: 0, width: 32, height: 32 };
  };

  module.exports = Entity;
}());
