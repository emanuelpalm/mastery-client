(function () {
  "use strict";

  var Promise = require("promise");

  /**
   * Determines whether or not the current user is logged using Facebook.
   *
   * If the user is logged in, then the promise returned is fulfilled with
   * the authentication data retrieved from Facebook.
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
        fulfill(response.status === "connected", response.authResponse);
      });
      setTimeout(reject, 1000);
    });
  }

  /**
   * Attempts to login the current user to Facebook.
   *
   * Returns a promise which is fulfilled if the user is logged in, or rejected
   * if the user is not.
   */
  exports.login = function () {
    return new Promise(function (fulfill, reject) {
      loadSDK()
        .then(loginToFacebook)
        .then(fulfill, reject);
    });
  };

  function loginToFacebook() {
    return new Promise(function (fulfill, reject) {
      FB.login(function (response) {
        if (response.AuthResponse) {
          fulfill(response.AuthResponse);
        }
        reject();
      });
    });
  }

}());
