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
    this.openDialog = isBrowser() ? function () {
      return new Promise(function (fulfill, reject) {
        showDialog()
          .then(loadImage)
          .then(postImage)
          .then(fulfill, reject);
      });

      function showDialog() {
        return new Promise(function (fulfill, reject) {
          var $form = createForm();
        });
      }

      function createForm() {
        var $form = document.createElement("form");
        $form.style.display = "none";

        var $token = document.createElement("input");
        $token.setAttribute("type", "hidden");
        $token.setAttribute("name", "token");
        $token.setAttribute("value", token);
        $form.appendChild($token);

        var $uploader = document.createElement("input");
        $uploader.setAttribute("type", "file");
        $uploader.setAttribute("name", "image");
        $form.appendChild($uploader);

        document.body.appendChild($form);

        return $form;
      }

      function destroyForm($form) {
        document.body.removeChild($form);
      }

      function loadImage() {
        return new Promise(function (fulfill, reject) {

        });
      }

      function postImage() {
        return new Promise(function (fulfill, reject) {

        });
      }
    };

        document.body.appendChild($form);

        $uploader.addEventListener("change", function (evt) {
          if ($uploader.value) {
            var reader = new FileReader();
            reader.onload = function (file) {
              var img = new Image();
              img.src = file.target.result;
              console.log(img);
            };
            reader.readAsDataURL(evt.target.files[0]);
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
          $form.parentNode.removeChild($form);
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
