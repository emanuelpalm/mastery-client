(function () {
  "use strict";

  var Promise = require("promise");
  var promise = require("../utils/promise.js");
  var http = require("http");

  /**
   * Utility class used for loading assets.
   *
   * @class
   */
  function GameAssetLoader() {
    var cache = {};

    /**
     * Returns a promise loading given target.
     *
     * The target may be a string URL or an object. In case of the target being an
     * object, it is traversed. Each string value encountered beginning with
     * "url:" is loaded and replaced with any results.
     *
     * If the target, or any subtarget, fails to load, the returned promise is
     * rejected. Also, providing an invalid target will cause the promise to be
     * rejected.
     */
    this.load = function (target) {
      switch (typeof target) {
      case "string":
        return loadURL(target)
          .then(loadIter);

      case "object":
        return loadURLsInObject(target);

      default:
        return promise.reject(
          new Error("Only URLs, or object with URLs may be loaded.")
        );
      }
    };

    var urlRegex = /^url:/i;
    function loadIter(target) {
      if (typeof target === "string" && target.match(urlRegex)) {
        return loadURL(target.slice(4))
          .then(loadIter);

      } else if (typeof target === "object" && !(target instanceof HTMLElement)) {
        return loadURLsInObject(target);

      } else {
        return promise.fulfill(target);
      }
    }

    var imgRegex = /.(png|jpg|jpeg|bmp)$/i;
    function loadURL(url) {
      var cached = cache[url];
      if (cached) {
        return promise.fulfill(cached);
      }
      if (url.match(imgRegex)) {
        return httpGetImage(url);
      }
      return httpGet(url);

      function httpGetImage(url) {
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

      function httpGet(url) {
        return new Promise(function (fulfill, reject) {
          http.request(url)
            .on("response", function (response) {
              getDataFrom(response)
                .then(fulfill, reject);
            })
            .on("error", reject)
            .end();
        });

        function getDataFrom(response) {
          return new Promise(function (fulfill, reject) {
            response
              .on("data", function (data) {
                if (Buffer.isBuffer(data)) {
                  data = data.toString();
                }
                if (response.headers["content-type"].match(/^application\/json/)) {
                  data = JSON.parse(data);
                }
                if (response.statusCode !== 200) {
                  reject(data);
                }
                cache[url] = data;
                fulfill(data);
              });
          });
        }
      }
    }

    function loadURLsInObject(object) {
      return new Promise(function (fulfill, reject) {
        var keys = Object.keys(object);
        var pendingLoads = keys.length;

        keys.forEach(function (key) {
          loadIter(object[key])
            .then(function (value) {
              completeLoad(key, value);
            }, reject);
        });

        function completeLoad(key, value) {
          object[key] = value;
          if (--pendingLoads === 0) {
            fulfill(object);
          }
        }
      });
    }
  }

  module.exports = GameAssetLoader;
}());
