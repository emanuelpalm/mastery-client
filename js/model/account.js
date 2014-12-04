(function () {
  "use strict";

  var Promise = require("promise");
  var Image = require("./entity/Image.js");

  /**
   * Authenticates current user with account service using data received from a
   * login provider, such as facebook.
   *
   * Returns a promise, which, if fulfilled, yields an Account object.
   */
  exports.authenticate = function (authResponse) {
    return new Promise(function (fulfill, reject) {
      // TODO: Implement.
      fulfill(new Account());
    });
  };

  /**
   * Represents a users connection to his/her Mastery account.
   */
  function Account() {
    // TODO: Implement.
  }

  /**
   * Sets given image as the user's avatar image.
   *
   * Returned promise is fulfilled when the avatar has been saved.
   */
  Account.prototype.setAvatarImage = function ($image) {
    return new Promise(function (fulfill, reject) {
      fulfill(new Image($image)); // TODO: Implement.
    });
  };

}());
