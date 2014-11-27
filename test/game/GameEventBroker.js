(function () {
  "use strict";

  var GameEventBroker = require("../../js/game/GameEventBroker.js");
  var GameEvent = require("../../js/game/GameEvent.js");

  exports.eventBroker = {

    setUp: function (callback) {
      this.broker = new GameEventBroker();
      callback();
    },
    
    testSubscribeAndPublish: function (test) {
      test.expect(1);

      this.broker.subscribe(function () {
        test.ok(true);
      }, "type");
      this.broker.publish(new GameEvent("type"));
      test.done();
    },

    testUnsubscribe: function (test) {
      var subscriber = function () {
        test.ok(false);
      };
      this.broker.subscribe(subscriber, "type");
      this.broker.subscribe(subscriber, "type");
      this.broker.unsubscribe(subscriber, "type");
      this.broker.publish(new GameEvent("type"));
      test.done();
    },
  };

}());
