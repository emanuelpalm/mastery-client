(function () {
  "use strict";

  var Promise = require("promise");
  var promise = require("./promise.js");

  /**
   * Uploads files from the users computer to some game account server.
   *
   * Each file is sent, with the given token, as a HTTP/HTTPS POST to the given
   * target url.
   */
  function FileUploader (token, url) {
    var $form, $uploader;
    if (isBrowser()) {
      $form = document.createElement("form");

      var $token = document.createElement("input");
      $token.setAttribute("type", "hidden");
      $token.setAttribute("value", token);
      $form.appendChild($token);

      $uploader = document.createElement("input");
      $uploader.setAttribute("type", "file");
      $form.appendChild($uploader);
    }
    
    /**
     * Opens a file dialog, allowing the user to pick a file.
     *
     * A promise is returned, which is fulfilled when the dialog is closed.
     */
    this.openDialog = isBrowser() ? function () {
      return new Promise(function (fulfill, reject) {
        $uploader.addEventListener("change", function () {
          if ($uploader.value) {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", function (evt) {
              if (evt.target.status === 201) {
                fulfill();
              } else {
                reject();
              }
            });
            xhr.addEventListener("error", reject);
            xhr.open("POST", url);
            xhr.send(new FormData($form));
          } else {
            fulfill();
          }
        });
        $uploader.click();
      });
    } : function () {
      return promise.fulfill();
    };
  }

  Object.freeze(FileUploader);

  function isBrowser() {
    return (typeof document !== "undefined");
  }

  module.exports = FileUploader;
}());
