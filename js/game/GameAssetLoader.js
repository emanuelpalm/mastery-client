(function () {
  "use strict";

  /**
   * Utility used for loading assets from files at some given root directory.
   *
   * @class
   */
  function GameAssetLoader(root) {

    /**
     * Loads asset batch at given path relative to asset root directory.
     *
     * The given callback, onLoad, is fired when the batch has loaded with a
     * map of its contents as argument. If loading batch fails an exception is
     * thrown and the application is terminated.
     */
    this.loadBatch = function (path, onLoad) {

    };
  }

  module.exports = GameAssetLoader;
}());

