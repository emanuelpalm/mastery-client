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

        loadAt(url)
          .then(function (batch) {
            var pendingJobs = 1;

            if (batch.entities) {
              forEachPathInMap(batch.entities, loadEntityAt)
                .then(function (entities) {
                  batch.entities = entities;
                  completeJob();
                })
                .catch(reject);
            } else {
              completeJob();
            }

            function completeJob() {
              pendingJobs -= 1;
              if (pendingJobs === 0) {
                Object.freeze(batch);
                fulfill(batch);
              }
            }
          })
          .catch(reject);
      });
    };

    function loadAt(url) {
      if (!url) {
        return Promise.reject(new Error("No URL given."));
      }

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
              if (Buffer.isBuffer(data)) {
                data = data.toString();
              }
              if (response.headers["content-type"] === "application/json") {
                data = JSON.parse(data);
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

    function forEachPathInMap(map, loader) {
      return new Promise(function (fulfill, reject) {
        var keys = Object.keys(map);
        var pendingJobs = keys.length;

        keys.forEach(function (key) {
          loader(map[key])
            .then(function (resource) {
              map[key] = resource;
              completeJob();
            })
            .catch(reject);
        });

        function completeJob() {
          pendingJobs -= 1;
          if (pendingJobs === 0) {
            fulfill(map);
          }
        }
      });
    }

    function loadEntityAt(path) {
      return new Promise(function (fulfill, reject) {
        loadAt(path)
          .then(function (entity) {
            if (!entity.sprite) {
              fulfill(entity);
            }
            loadSpriteAt(entity.sprite)
              .then(function (sprite) {
                entity.sprite = sprite;
                fulfill(entity);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    }

    function loadSpriteAt(path) {
      return new Promise(function (fulfill, reject) {
        loadAt(path)
          .then(function (sprite) {
            if (!sprite.image) {
              reject(new Error("Sprite '" + path + "' has no image."));
            }
            loadAt(sprite.image)
              .then(function (image) {
                sprite.image = image;
                fulfill(sprite);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    }

    Object.seal(this);
  }

  module.exports = GameAssetLoader;
}());
