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
        sprite: {
          image: "sprite",
          states: [0],
        },
      });
      callback();
    },

    testGetSprite: function (test) {
      test.deepEqual(this.entity.getSprite(), { image: "sprite", states: [0] });
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

    testSetPosition: function (test) {
      this.entity.setPosition(100, 200);
      var bounds = this.entity.getBounds();
      test.equal(bounds.x, 100);
      test.equal(bounds.y, 200);
      test.done();
    },

    testSetVelocity: function (test) {
      this.entity.setVelocity(10, 20);
      var bounds = this.entity.getBounds();
      test.equal(bounds.dx, 10);
      test.equal(bounds.dy, 20);
      test.done();
    },

    testSetSize: function (test) {
      this.entity.setSize(1000, 2000);
      var bounds = this.entity.getBounds();
      test.equal(bounds.width, 1000);
      test.equal(bounds.height, 2000);
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
