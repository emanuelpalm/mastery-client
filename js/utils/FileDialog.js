(function () {
  "use strict";

  var Promise = require("promise");
  var promise = require("./promise.js");

  /**
   * Allows the application user to select files from disk and make them
   * available to the application.
   */
  function FileDialog() {
    
    /**
     * Opens a dialog for selecting a single image.
     *
     * Returns a promise fulfilled with an image object, if the user selected a
     * new valid image.
     */
    this.selectImage = isBrowser() ? function () {
      return showSelectDialog()
        .then(verifySelectedFileIsImage)
        .then(loadFile)
        .then(convertFileToImage);
    } : function () {
      return promise.fulfill();
    };

    function showSelectDialog() {
      return new Promise(function (fulfill) {
        var formSet = createFormSet();
        formSet.$uploader.addEventListener("change", function (evt) {
          destroyFormSet(formSet);
          fulfill(evt.target.files.item(0));
        });
        formSet.$uploader.click();
      });

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
  }

  Object.freeze(FileDialog);

  function isBrowser() {
    return (typeof document !== "undefined");
  }

  module.exports = FileDialog;
}());
