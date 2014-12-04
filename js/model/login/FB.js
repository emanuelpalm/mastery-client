/**
 * Facebook login management.
 *
 * @module model/login/FB
 */
(function () {
  "use strict";

  var Promise = require("promise");

  /**
   * Determines whether or not the current user is logged using Facebook.
   *
   * If the user is logged in, then the promise returned is fulfilled with two
   * arguments: (1) whether or not the user is logged in, (2) the authentication
   * data received from Facebook.
   */
  exports.getLoginStatus = function () {
    return new Promise(function (fulfill, reject) {
      loadSDK()
        .then(getFacebookLoginStatus)
        .then(fulfill, reject);
    });
  };

  function loadSDK() {
    return new Promise(function (fulfill, reject) {
      if (document.getElementById("facebook-jssdk")) {
        fulfill();
      }
      var $facebookScript = document.createElement("script");
      $facebookScript.id = "facebook-jssdk";
      $facebookScript.src = "//connect.facebook.net/en_GB/sdk.js";
      $facebookScript.addEventListener("load", function () {
        window.fbAsyncInit = function() {
          FB.init({
            appId: "881132155233080",
            xfbml: true,
            version: "v2.2"
          });
          fulfill();
        };
        setTimeout(reject, 1000);
      });
      $facebookScript.addEventListener("error", reject);
      document.head.appendChild($facebookScript);
    });
  }

  function getFacebookLoginStatus() {
    return new Promise(function (fulfill, reject) {
      FB.getLoginStatus(function (response) {
        fulfill({
          isLoggedIn: response.status === "connected",
          auth: response.authResponse,
        });
      });
      setTimeout(reject, 1000);
    });
  }

  /**
   * Attempts to login the current user to Facebook.
   *
   * If the user is logged in, then the promise returned is fulfilled with two
   * arguments: (1) whether or not the user is logged in, (2) the authentication
   * data received from Facebook.
   */
  exports.login = function () {
    return new Promise(function (fulfill, reject) {
      loadSDK()
        .then(loginToFacebook)
        .then(fulfill, reject);
    });
  };

  function loginToFacebook() {
    return new Promise(function (fulfill) {
      FB.login(function (response) {
        fulfill(response.status === "connected", response.authResponse);
      });
    });
  }

}());
