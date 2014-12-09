(function () {
  "use strict";

  var Promise = require("promise");
  var CanvasFactory = require("../utils/CanvasFactory.js");
  var http = require("http");

  /**
   * Authenticates current user with account service using data received from a
   * login provider, such as facebook.
   *
   * Returns a promise, which, if fulfilled, yields an Account object.
   */
  exports.authenticate = function (auth) {
    return new Promise(function (fulfill, reject) {
      var host = (auth.mode === "debug") ? "localhost" : "mastery-account";
      var port = 8081;

      if (auth.mode === "debug") {
        fulfill(new Account({ id: 123, avatarUrl: null }, host, port));
      } else {
        httpGetMe(auth.token, host, port)
          .then(function (data) {
            fulfill(new Account(data, host, port));
          }, reject);
      }
    });
  };

  function httpGetMe(token, host, port) {
    return new Promise(function (fulfill, reject) {
      http.request({
        host: host,
        port: port,
        method: "GET",
        path: "/me?token=" + token,
      }, function (res) {
        if (res.statusCode === 200) {
          res.on("data", function (data) {
            fulfill(data);
          });
        } else {
          reject("Failed to retrieve account data.");
        }
      }).end();
    });
  }

  /**
   * Represents a users connection to his/her Mastery account.
   */
  function Account(data, host, port) {
    this.id = data.id;
    this.avatarUrl = data["avatar-url"];
    this.host = host;
    this.port = port;
  }

  /**
   * Acquires avatar image associated with account.
   *
   * Returned promise is fulfilled when the image has been retrieved. If the
   * account has no associated image, the promise is fulfilled with null.
   */
  Account.prototype.getAvatarImage = function () {
    var that = this;
    return new Promise(function (fulfill, reject) {
      if (!that.avatarUrl) {
        fulfill(null);
      }
      httpGetAvatarsName(that.avatarUrl)
        .then(fulfill, reject);
    });
  };

  function httpGetAvatarsName(url) {
    return new Promise(function (fulfill, reject) {
      var $image = new Image();
      $image.addEventListener("load", function () {
        fulfill($image);
      });
      $image.addEventListener("error", reject);
      $image.src = url;
    });
  }

  /**
   * Sets given image as the user's avatar image.
   *
   * Returned promise is fulfilled when the avatar has been saved.
   */
  Account.prototype.setAvatarImage = function ($image) {
    var that = this;
    return new Promise(function (fulfill, reject) {
      var canvasFactory = new CanvasFactory();
      var $resizedImage = canvasFactory.resizeImage($image, 60, 60);
      var data = canvasFactory.imageToDataObject($resizedImage);

      httpPostAvatars(data, that.host, that.port)
        .then(function (location) {
          that.avatarUrl = location;
          fulfill($resizedImage);
        }, reject);
    });
  };

  function httpPostAvatars(data, host, port) {
    return new Promise(function (fulfill, reject) {
      http.request({
        host: host,
        port: port,
        method: "POST",
        path: "/avatars",
        headers: {
          "Content-Type": "application/json",
        },
      }, function (res) {
        if (res.statusCode === 204) {
          fulfill(res.headers.location);
        } else {
          reject("Unable to send avatar to server.");
        }
      }).end(data);
    });
  }

  Object.freeze(Account);
}());
