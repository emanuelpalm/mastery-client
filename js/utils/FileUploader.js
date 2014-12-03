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
    
    /**
     * Opens a file dialog, allowing the user to pick a file.
     *
     * A promise is returned, which is fulfilled when the dialog is closed.
     */
    this.openImageDialog = isBrowser() ? function () {
      return showSelectDialog()
        .then(verifySelectedFileIsImage)
        .then(loadFile)
        .then(postFile)
        .then(convertFileToImage);

      function showSelectDialog() {
        return new Promise(function (fulfill, reject) {
          var formSet = createFormSet(), $uploader = formSet.$uploader;
          $uploader.addEventListener("change", function (evt) {
            destroyFormSet(formSet);
            fulfill($uploader.files.item(0));
          });
          $uploader.addEventListener("error", function (e) {
            reject(e);
          });
          $uploader.click();
        });
      }

      function createFormSet() {
        var $form = document.createElement("form");
        $form.style.display = "none";

        var $uploader = document.createElement("input");
        $uploader.setAttribute("type", "file");
        $form.appendChild($uploader);

        document.body.appendChild($form);

        return { $form: $form, $uploader: $uploader };
      }

      function destroyFormSet(formSet) {
        document.body.removeChild(formSet.$form);
      }

      var fileTypeRegex = /image.*/;
      function verifySelectedFileIsImage(file) {
        return new Promise(function (fulfill, reject) {
          if (file.type.match(fileTypeRegex)) {
            fulfill(file);
          } else {
            reject("Selected file is not an image in a supported format.");
          }
        });
      }

      function loadFile(file) {
        return new Promise(function (fulfill, reject) {
          var reader = new FileReader();
          reader.addEventListener("load", function () {
            fulfill(reader.result);
          });
          reader.addEventListener("error", function (e) {
            reject("Unable to load selected file.");
          });
          reader.readAsDataURL(file);
        });
      }

      function postFile(encodedFile) {
        return new Promise(function (fulfill, reject) {
          var xhr = new XMLHttpRequest();
          xhr.addEventListener("load", function (evt) {
            if (evt.target.status === 201) {
              fulfill(encodedFile);
            } else {
              reject("Failed to send file to server.");
            }
          });
          xhr.addEventListener("error", reject);
          xhr.open("POST", url);
          xhr.send(JSON.stringify({ file: encodedFile }));
        });
      }

      function convertFileToImage(encodedFile) {
        return new Promise(function (fulfill, reject) {
          var image = new Image();
          image.addEventListener("load", function () {
            fulfill(image);
          });
          image.addEventListener("error", function (e) {
            reject(e);
          });
          image.src = encodedFile;
        });
      }
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
