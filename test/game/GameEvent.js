(function () {
  "use strict";

  var GameEvent = require("../../js/game/GameEvent.js");

  exports.createAndCheck = function (test) {
    var evt = new GameEvent("type", {
      "data": [0, 1, 2, 3],
    });

    test.equal(evt.getType(), "type");
    test.deepEqual(evt.getProperties(), {
      "data": [0, 1, 2, 3],
    });
    test.done();
  };
}());