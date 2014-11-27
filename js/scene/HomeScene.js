(function () {
  "use strict";

  /**
   * Represents the game home menu.
   *
   * The scene is created with an account object, which is required for the user
   * to be able to manages his/her account or join games.
   */
  function HomeScene(account) {
    this._account = account;
  }

  HomeScene.prototype.load = function (assetLoader, done, failed) {
    done();
  };

  HomeScene.prototype.setup = function (toScene, load) {

  };

  HomeScene.prototype.update = function (dt) {

  };

  HomeScene.prototype.record = function (camera) {

  };

  module.exports = HomeScene;
}());
