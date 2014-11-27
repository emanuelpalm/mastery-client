(function () {
  "use strict";

  /**
   * Manages subscriptions and publishings of events.
   */
  function GameEventBroker() {
    this._exchange = {};
  }

  /**
   * Publishes given event to all subscribers of the event type.
   */
  GameEventBroker.prototype.publish = function (evt) {
    var subscribers = this._exchange[evt.type];
    if (Array.isArray(subscribers)) {
      subscribers.forEach(function (subscriber) {
        subscriber(evt);
      });
    }
  };

  /**
   * Registers given subscriber callback to receive subsequent events of the
   * given type.
   */
  GameEventBroker.prototype.subscribe = function (subscriber, eventType) {
    var subscribers = this._exchange[eventType];
    if (Array.isArray(subscribers)) {
      subscribers.push(subscriber);

    } else {
      this._exchange[eventType] = [subscriber];
    }
  };

  /**
   * De-registers given subscriber from receiving events of given type.
   */
  GameEventBroker.prototype.unsubscribe = function (subscriber, eventType) {
    var subscribers = this._exchange[eventType];
    if (Array.isArray(subscribers)) {
      var index = subscribers.indexOf(subscriber);
      do {
        subscribers.splice(index, 1);
      } while ((index = subscribers.indexOf(subscriber)) !== -1);
    }
  };

  module.exports = GameEventBroker;
}());
