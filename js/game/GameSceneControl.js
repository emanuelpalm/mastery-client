/* jshint unused:false */
(function () {
  "use strict";

  var GameAssetLoader = require("./GameAssetLoader.js");

  /**
   * Allows a scene to control its context.
   *
   * An instance of this class, with its methods properly populated, is passed
   * to a scene on setup.
   *
   * @class
   */
  function GameSceneControl() {
    var assetLoader = new GameAssetLoader();

    /**
     * Aquires GameAssetLoader.
     */
    this.getAssetLoader = function () {
      return assetLoader;
    };

    /**
     * Notifies about scene being ready to become active.
     *
     * When a scene is done setting itself up, it has to call this method in
     * order for a transition to it to actually happen.
     */
    this.ready = function () {};

    /**
     * Causes application to report given error and terminate.
     */
    this.panic = function (error) {};

    /**
     * Registers given event callback function.
     *
     * The registered function receives a GameEvent whenever any such is
     * generated.
     */
    this.onEvent = function (f) {};

    /**
     * Causes eventual transition from current scene to given next scene.
     */
    this.toScene = function (nextScene) {};
  }

  module.exports = GameSceneControl;
}());
