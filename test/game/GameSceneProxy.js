(function () {
  "use strict";

  var GameSceneProxy = require("../../js/game/GameSceneProxy.js");

  exports.forwardCalls = function (test) {
    test.expect(11);

    var recordedEvt = null,
      recordedDt = null,
      recordedCamera = null;

    var proxy = new GameSceneProxy({
      load: function (loader, done, failed) {
        test.ok(loader);
        test.ok(done);
        test.equal(failed, "failed");
        done();
      },
      setup: function (toScene, load) {
        test.ok(toScene);
        test.ok(load);

        return function (evt) {
          recordedEvt = evt;
        };
      },
      update: function (dt) {
        recordedDt = dt;
      },
      record: function (camera) {
        recordedCamera = camera;
      },
    }, "failed");

    test.equal(recordedEvt, null);
    test.equal(recordedDt, null);
    test.equal(recordedCamera, null);

    proxy.update("update");
    test.equal(recordedDt, "update");

    proxy.record("camera");
    test.equal(recordedCamera, "camera");

    proxy.notify("event");
    test.equal(recordedEvt, "event");

    test.done();
  };

  exports.forwardPanic = function (test) {
    new GameSceneProxy({
      load: function (assetLoader, done, failed) {
        failed("panic");
      },
      setup: function () {},
      update: function () {},
      record: function () {},
    }, function (error) {
      test.equal(error, "panic");
      test.done();
    });
  };

  exports.toScene = function (test) {
    test.expect(3);

    var scene2 = {
      load: function (assetLoader, done) {
        test.ok(true);
        done();
      },
      setup: function () {
        test.ok(true);
      }
    };

    var scene1 = {
      load: function (assetLoader, done) {
        done();
      },
      setup: function (toScene) {
        return function () {
          test.ok(true);
          toScene(scene2);
        };
      }
    };

    var proxy = new GameSceneProxy(scene1);
    proxy.notify("go to next scene");
    test.done();
  };

  exports.preloadScene = function (test) {
    var scene2 = {
      load: function (assetLoader, done) {
        test.ok(true);
        done();
        test.done();
      },
      setup: function () {}
    };

    new GameSceneProxy({
      load: function (assetLoader, done) {
        done();
      },
      setup: function (toScene, load) {
        load(scene2);
      }
    });
  };
}());
