(function () {
  "use strict";

  var Promise = require("promise");
  var Image = require("./entity/Image.js");
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
      console.log(auth);
      if (auth.mode === "debug") {
        fulfill(new Account("localhost"));
      } else {
        fulfill(new Account("mastery-account"));
      }
    });
  };

  /**
   * Represents a users connection to his/her Mastery account.
   */
  function Account(host) {
    this.host = host;
    this.port = 14000;

    // TODO: Implement.
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
      http.request({
        host: that.host,
        port: that.port,
        method: "POST",
        path: "/avatars",
        headers: {
          "Content-Type": "application/json",
        },
      }, function (res) {
        if (res.statusCode === 204) {
          fulfill(new Image($resizedImage));
        } else {
          reject("Unable to send avatar to server.");
        }
      }).end(data);
    });
  };

}());
