(function () {
  "use strict";

  var Promise = require("promise");
  var CanvasFactory = require("../utils/CanvasFactory.js");
  var browser = require("../utils/browser.js");
  var http = require("http");

  /**
   * Authenticates current user with account service using data received from a
   * login provider, such as facebook.
   *
   * Returns a promise, which, if fulfilled, yields an Account object.
   */
  exports.authenticate = function (auth) {
    return new Promise(function (fulfill, reject) {
      var host = browser.getAddressFieldHost();

      if (auth.mode === "debug") {
        fulfill(new Account({
          id: (Math.random() * 65536) | 0,
          avatarUrl: null
        }, host));
      } else {
        httpGetAccountMe(auth.accessToken, host)
          .then(function (data) {
            fulfill(new Account(data, host, auth.accessToken));
          }, reject);
      }
    });
  };

  function httpGetAccountMe(token, host) {
    return new Promise(function (fulfill, reject) {
      http.request({
        host: host,
        port: browser.getAddressFieldPort(),
        method: "GET",
        path: "/account/me?token=" + token,
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
  function Account(data, host, token) {
    this.id = data.id;
    this.avatarUrl = data["avatar-url"];
    this.host = host;
    this.token = token;
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
      httpGetAccountAvatarsName(that.avatarUrl)
        .then(fulfill, reject);
    });
  };

  function httpGetAccountAvatarsName(url) {
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

      httpPostAccountAvatars(data, that.host, that.token)
        .then(function (location) {
          that.avatarUrl = location;
          fulfill($resizedImage);
        }, reject);
    });
  };

  function httpPostAccountAvatars(data, host, token) {
    return new Promise(function (fulfill, reject) {
      http.request({
        host: host,
        port: browser.getAddressFieldPort(),
        method: "POST",
        path: "/account/avatars",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }, function (res) {
        if (res.statusCode === 204) {
          fulfill(res.headers.location);
        } else {
          reject("Unable to send avatar to server.");
        }
      }).end(JSON.stringify(data));
    });
  }

  Object.freeze(Account);
}());
