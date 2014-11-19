(function () {
  "use strict";

  var Promise = require("promise");
  var http = require("http");

  /**
   * Utility class used for loading assets.
   *
   * @class
   */
  function GameAssetLoader() {
    var imageRegex = /.(png|jpg|jpeg|bmp)$/i;
    var cache = {};

    /**
     * Loads asset batch at given URL.
     *
     * The method returns a promise, which when done serves a map containing the
     * batch data.
     */
    this.loadBatch = function (url) {
      return new Promise(function (fulfill, reject) {
        loadOne(url)
          .then(function (batch) {
            console.log(batch);
          })
          .catch(reject);
      });
    };

    function loadOne(url) {
      var promise = loadCached(url);
      if (promise !== null) {
        return promise;
      }
      promise = loadImageAt(url);
      if (promise !== null) {
        return promise;
      }
      return loadResourceAt(url);
    }

    function loadCached(url) {
      var item = cache[url];
      if (item) {
        return new Promise(function (fulfill) {
          fulfill(item);
        });
      }
      return null;
    }

    function loadImageAt(url) {
      if (url.match(imageRegex)) {
        return new Promise(function (fulfill, reject) {
          var image = new Image();
          image.addEventListener("load", function () {
            cache[url] = image;
            fulfill(image);
          });
          image.addEventListener("error", function () {
            reject(new Error("Unable to load image at '" + url + "'."));
          });
          image.src = url;
        });
      }
      return null;
    }

    function loadResourceAt(url) {
      return new Promise(function (fulfill, reject) {
        http.request(url)
          .on("response", function (response) {
            response.on("data", function (data) {
              if (response.headers["content-type"] === "application/json") {
                data = JSON.parse(data);
                Object.freeze(data);
              }
              if (response.statusCode < 200 || response.statusCode > 299) {
                reject(data);
                return;
              }
              cache[url] = data;
              fulfill(data);
            });
          })
          .on("error", reject)
          .end();
      });
    }
  }

  module.exports = GameAssetLoader;
}());
