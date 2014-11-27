(function () {
  "use strict";

  /**
   * Developer login.
   *
   * This login method ought to only be available when running the application
   * in debug mode locally. It bypasses the requirement of using any actual
   * authentication and lets a developer use the application with a standard
   * account.
   */
  function Developer() {

  }

  module.exports = Developer;
}());
