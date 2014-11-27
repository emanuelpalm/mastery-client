(function () {
  "use strict";

  var Promise = require("promise");

  /**
   * Authenticates current user with account service using data received from a
   * login provider, such as facebook.
   *
   * Returns a promise, which, if fulfilled, yields an Account object.
   */
  exports.authenticate = function (authResponse) {
    console.log(authResponse);
    return new Promise(function (fulfill, reject) {
      fulfill(new Account());
    });
  };

  /**
   * Represents a users connection to his/her Mastery account.
   */
  function Account() {

  }

}());
