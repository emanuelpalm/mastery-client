(function () {
  "use strict";

  var GameSceneProxy = require("../../js/game/GameSceneProxy.js");

  exports.forwardEvents = function (test) {

    var recordedEvt = null,
      recordedDt = null,
      recordedCamera = null;

    var proxy = new GameSceneProxy({
      setup: function () {
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
    });

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

  exports.toScene = function (test) {
    test.expect(2);

    var scene2 = {
      setup: function () {
        test.ok(true);
      }
    };

    var scene1 = {
      setup: function (loader, toScene) {
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

}());
