(function () {
  "use strict";

  /**
   * A game event, created with a string type and arbitrary properties.
   *
   * @class
   */
  function GameEvent(type, properties) {

    /**
     * Contains string type identifier.
     */
    this.type = type;

    /**
     * Contains event properties.
     */
    this.properties = properties;
  }

  module.exports = GameEvent;
}());
