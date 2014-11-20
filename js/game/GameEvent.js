(function () {
  "use strict";

  /**
   * A game event, created with a string type and arbitrary properties.
   *
   * @class
   */
  function GameEvent(type, properties) {

    /**
     * Acquires string type identifier.
     */
    this.getType = function () {
      return type;
    };

    /**
     * Acquires event properties.
     */
    this.getProperties = function () {
      return properties;
    };
  }

  module.exports = GameEvent;
}());
