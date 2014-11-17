(function () {
  "use strict";

  var httpSync = require("../utils/http-sync.js");

  /**
   * Utility used for loading assets from files at some given root directory.
   *
   * @class
   */
  function GameAssetLoader(rootPath) {

    /**
     * Loads asset batch at given path relative to asset root directory.
     *
     * The given callback f is fired when the batch has loaded with a map of its
     * contents as argument. if an error occurrs the callback is also fired, but
     * with its first argument set to null and with a second argument containing
     * the error.
     */
    this.loadBatch = function (path, f) {
      setTimeout(function () {
        try {
          var data = httpSync.get(rootPath + "asdf" + path);
          console.log(data);

        } catch (e) {
          f(null, e);
        }
      }, 0);
    };

    function loadEntitiesIn(list) {
      if (!list) {
        return {};
      }
      var entities = {};
      Object.keys(list).forEach(function (key) {
        entities[key] = loadEntityAt(list[key]);
      });
    }

    function loadEntityAt(path) {

    }
  }

  module.exports = GameAssetLoader;
}());

