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
  function FileUploader(token, url) {
    
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
        return new Promise(function (fulfill) {
          var formSet = createFormSet();
          formSet.$uploader.addEventListener("change", function (evt) {
            destroyFormSet(formSet);
            fulfill(evt.target.files.item(0));
          });
          formSet.$uploader.click();
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

      function verifySelectedFileIsImage(file) {
        return new Promise(function (fulfill, reject) {
          if (/^image\/(gif|png|jpg|jpeg|bmp)/.test(file.type)) {
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
          reader.addEventListener("error", function () {
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
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.send(JSON.stringify(dataUriToObject(encodedFile)));
        });
      }

      function dataUriToObject(data) {
        if (typeof data !== "string" && data.indexOf("data:") !== 0) {
          throw new Error("Not a data URI given.");
        }
        var chunks = data.slice(5).split(";");
        var encodingData = chunks.pop().split(",");
        var result = {};

        if (chunks.length === 2) {
          result.mimetype = chunks[0];
          result.charset = chunks[1].split("=")[1];

        } else if (chunks.length === 1) {
          if (chunks[0].indexOf("charset") === 0) {
            result.charset = chunks[0].split("=")[1];

          } else {
            result.mimetype = chunks[0];
          }
        }
        if (encodingData.length === 2) {
          result.encoding = encodingData[0];
          result.data = encodingData[1];

        } else if (encodingData.length === 1) {
          result.data = encodingData[0];

        } else {
          throw new Error("Data URI given lacks data.");
        }
        result.mimetype = result.mimetype || "text/plain";
        result.charset = result.charset || "US-ASCII";
        result.encoding = result.encoding || "base64";
        return result;
      }

      function convertFileToImage(encodedFile) {
        return new Promise(function (fulfill, reject) {
          var image = new Image();
          image.addEventListener("load", function () {
            fulfill(image);
          });
          image.addEventListener("error", function () {
            reject("Failed to convert file into image.");
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
