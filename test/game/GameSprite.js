(function () {
  "use strict";

  var GameSprite = require("../../js/game/GameSprite.js");

  exports.sprite = {
    setUp: function (callback) {
      this.sprite = new GameSprite({
        width: 100,
        height: 200,
        image: "image",
        states: [
          [1, 2],
          [3, 4],
        ],
      });
      callback();
    },

    testGetImage: function (test) {
      test.equal(this.sprite.getImage(), "image");
      test.done();
    },

    testGetBounds: function (test) {
      test.deepEqual(this.sprite.getBounds(), {
        x: 1,
        y: 2,
        width: 100,
        height: 200,
      });
      test.done();
    },

    testSetState: function (test) {
      this.sprite.setState(1);
      test.deepEqual(this.sprite.getBounds(), {
        x: 3,
        y: 4,
        width: 100,
        height: 200,
      });
      test.done();
    },
  };
}());
