(function () {
  "use strict";

  var GameEntity = require("../../js/game/GameEntity.js");

  exports.entity = {
    setUp: function (callback) {
      this.entity = new GameEntity({
        bounds: {
          x: 1,
          y: 2,
          width: 3,
          height: 4,
          dx: 5,
          dy: 6,
        },
        sprite: "sprite",
      });
      callback();
    },

    testGetSprite: function (test) {
      test.equal(this.entity.getSprite(), "sprite");
      test.done();
    },

    testGetBounds: function (test) {
      var bounds = this.entity.getBounds();
      test.equal(bounds.x, 1);
      test.equal(bounds.y, 2);
      test.equal(bounds.width, 3);
      test.equal(bounds.height, 4);
      test.equal(bounds.dx, 5);
      test.equal(bounds.dy, 6);
      test.done();
    },

    testUpdate: function (test) {
      this.entity.update(2);
      var bounds = this.entity.getBounds();
      test.equal(bounds.x, 11);
      test.equal(bounds.y, 14);
      test.done();
    },
  };

}());
