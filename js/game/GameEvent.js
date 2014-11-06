(function () {
  "use strict";

  /**
   * A game event.
   *
   * @class
   * @param {*} type - Type of event.
   * @param {Object|null} [properties] - Event data payload.
   */
  function GameEvent(type, properties) {

    /**
     * @return {*} Event type.
     */
    this.getType = function () {
      return type;
    };

    /**
     * @return {Object|null} Event data payload.
     */
    this.getProperties = function () {
      return properties;
    };
  }

  module.exports = GameEvent;
}());