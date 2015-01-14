(function () {
  "use strict";

  var GameAssetLoader = require("./GameAssetLoader.js");
  var Promise = require("promise");
  var History = require("../utils/History.js");

  /**
   * Manages a current scene and its transitions to other scenes.
   *
   * @class
   */
  function GameSceneProxy(originScene, onPanic) {
    var assetLoader = new GameAssetLoader();

    var scene = {
      update: function () {},
      record: function () {},
    };
    var eventCallback = unhandledEvent;
    toScene(originScene);

    var history = new History();
    history.addPopStateListener(handleHistoryChange);

    function unhandledEvent(evt) {
      console.log("Unhandled event: " + evt.type);
    }

    function toScene(nextScene) {
      if (nextScene.isLoaded) {
        transitionTo(nextScene);

      } else if (nextScene.loadError) {
        onPanic(nextScene.loadError);

      } else {
        nextScene.load(assetLoader, function () {
          transitionTo(nextScene);
        }, onPanic);
      }
    }

    function transitionTo(nextScene) {
      eventCallback = nextScene.setup(toScene, load);
      if (typeof eventCallback !== "function") {
        eventCallback = unhandledEvent;
      }
      scene = nextScene;
      if (nextScene.isHistoric !== true) {
        saveHistory(nextScene);
      }

      function saveHistory(nextScene) {
        if (nextScene.name) {
          history.pushState(nextScene, nextScene.name, "#" + nextScene.name);
        }
      }
    }

    function load(otherScene) {
      return new Promise(function (fulfill) {
        otherScene.load(assetLoader, function () {
          otherScene.isLoaded = true;
          fulfill(otherScene);
        }, function (e) {
          otherScene.loadError = e;
          fulfill(otherScene);
        });
      });
    }

    function handleHistoryChange(scene) {
      scene.isHistoric = true;
      toScene(scene);
    }

    /**
     * Updates current scene relative to given elapsed time since last update.
     */
    this.update = function (dt) {
      scene.update(dt);
    };

    /**
     * Records entities which are to be displayed at the next screen frame.
     */
    this.record = function (camera) {
      scene.record(camera);
    };

    /**
     * Notifies current scene about some occurred event.
     */
    this.notify = function (evt) {
      eventCallback(evt);
    };

    Object.seal(this);
  }

  module.exports = GameSceneProxy;
}());
