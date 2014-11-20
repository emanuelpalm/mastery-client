(function () {
  "use strict";

  var GameCamera = require("../../js/game/GameCamera.js");

  exports.testDefaultBounds = function (test) {
    var camera = new GameCamera();
    var bounds = camera.getBounds();

    test.ok(bounds);
    test.equal(bounds.x, 0);
    test.equal(bounds.y, 0);
    test.ok(bounds.width > 0);
    test.ok(bounds.height > 0);
    test.done();
  };

  exports.testSetSizeInConstructor = function (test) {
    var camera = new GameCamera(800, 600);
    var bounds = camera.getBounds();

    test.ok(bounds);
    test.equal(bounds.x, 0);
    test.equal(bounds.y, 0);
    test.equal(bounds.width, 800);
    test.equal(bounds.height, 600);
    test.done();
  };

  exports.testSetBounds = function (test) {
    var camera = new GameCamera();
    camera.setBounds({x: 1, y: 2, width: 3, height: 4});

    var bounds = camera.getBounds();

    test.ok(bounds);
    test.equal(bounds.x, 1);
    test.equal(bounds.y, 2);
    test.equal(bounds.width, 3);
    test.equal(bounds.height, 4);
    test.done();
  };

  exports.testSetPosition = function (test) {
    var camera = new GameCamera();
    camera.setPosition(123, 456);

    var bounds = camera.getBounds();

    test.ok(bounds);
    test.equal(bounds.x, 123);
    test.equal(bounds.y, 456);
    test.ok(bounds.width > 0);
    test.ok(bounds.height > 0);
    test.done();
  };

}());
