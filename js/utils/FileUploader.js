(function () {
  "use strict";

  var Promise = require("promise");
  var promise = require("./promise.js");

  /**
   * Uploads files from the users computer to some game account server.
   *
   * Each file is sent as a HTTP/HTTPS POST to the given target url.
   */
  function FileUploader (url) {
    var $uploader;
    if (isBrowser()) {
      $uploader = document.createElement("input");
      $uploader.setAttribute("type", "file");
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
            console.log("TODO: Upload.");
          }
          fulfill();
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
