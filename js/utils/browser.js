/**
 * Browser-related function.
 *
 * @module utils/browser
 */
(function () {
  "use strict";

  /**
   * Aquires host in address field of browser.
   */
  exports.getAddressFieldHost = isBrowser() ? function () {
    return window.location.host.split(":")[0];
  } : function () {
    return "localhost";
  };

  /**
   * Aquires port in address field of browser.
   */
  exports.getAddressFieldPort = isBrowser() ? function () {
    return window.location.port;
  } : function () {
    return 0;
  };

  function isBrowser() {
    return (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined"
    );
  }
}());
