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
      });
      this.other = new GameEntity({
        bounds: {
          x: 11,
          y: 12,
          width: 7,
          height: 8,
        },
      });
      callback();
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

    testIntersectsWithEntity: function (test) {
      test.ok(!this.entity.intersects(this.other));
      test.ok(!this.other.intersects(this.entity));

      this.other.setPosition(3, 5);
      test.ok(this.entity.intersects(this.other));
      test.ok(this.other.intersects(this.entity));

      test.done();
    },

    testIntersectsWithBounds: function (test) {
      test.ok(!this.entity.intersects(this.other.getBounds()));
      test.ok(!this.other.intersects(this.entity.getBounds()));

      this.other.setPosition(-5, 5);
      test.ok(this.entity.intersects(this.other.getBounds()));
      test.ok(this.other.intersects(this.entity.getBounds()));

      test.done();
    },

    testIntersectsWithPoint: function (test) {
      test.ok(!this.entity.intersects({ x: -13, y: 1 }));
      test.ok(!this.other.intersects({ x: 3, y: 120 }));

      test.ok(this.entity.intersects({ x: 1.2, y: 2.3 }));
      test.ok(this.other.intersects({ x: 14, y: 19 }));

      test.done();
    },

    testIntersectsWithInvalidValue: function (test) {
      test.ok(!this.entity.intersects(null));
      test.ok(!this.entity.intersects({}));
      test.ok(!this.entity.intersects({ a: 1.1, b: 2.1 }));
      test.ok(!this.entity.intersects({ x: "hello", y: "goodbye" }));
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
