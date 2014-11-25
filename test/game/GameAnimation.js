(function () {
  "use strict";

  var GameAnimation = require("../../js/game/GameAnimation.js");

  exports.animation = {
    setUp: function (callback) {
      this.animation = new GameAnimation({
        default: {
          interval: 1,
          frames: [0, 1, 2, 3]
        },
        second: {
          interval: 2,
          frames: [9, 3, 2, -1]
        },
        third: {
          interval: 3,
          frames: [8, 9, -1]
        }
      });
      callback();
    },

    testGetFrame: function (test) {
      test.equal(this.animation.getFrame(), 0);
      test.done();
    },

    testUpdate: function (test) {
      this.animation.update(1.5);
      test.equal(this.animation.getFrame(), 1);

      this.animation.update(1);
      test.equal(this.animation.getFrame(), 2);

      this.animation.update(2);
      test.equal(this.animation.getFrame(), 0);

      test.done();
    },

    testSetProgram: function (test) {
      this.animation.setProgram("second");
      test.equal(this.animation.getFrame(), 9);

      this.animation.setProgram("third");
      test.equal(this.animation.getFrame(), 8);

      test.done();
    },

    testIndexFrame: function (test) {
      this.animation.setProgram("second");
      this.animation.update(7);
      test.equal(this.animation.getFrame(), 3);
      this.animation.update(2);
      test.equal(this.animation.getFrame(), 2);

      this.animation.setProgram("third");
      this.animation.update(4);
      test.equal(this.animation.getFrame(), 9);

      test.done();
    },
  };

}());
