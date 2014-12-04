/**
 * Developer mock-up login.
 *
 * @module model/login/DEV
 */
(function () {
  "use strict";

  /**
   * Logs in a mock-up user.
   *
   * The function returns a promise that is guaranteed to be fulfilled with a
   * first value with true, and a second argument identifying the login attempt
   * as a debug attempt.
   */
  exports.login = function () {
    return new Promise(function (fulfill) {
      fulfill({
        isLoggedIn: true,
        auth: { mode: "debug" },
      });
    });
  };

}());
