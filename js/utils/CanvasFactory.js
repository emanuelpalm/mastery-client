(function () {
  "use strict";

  /**
   * Factory class for creating canvas elements.
   */
  function CanvasFactory () {}

  /**
   * Creates new canvas element with given width and height in pixels.
   */
  CanvasFactory.prototype.createElement = isBrowser() ? function (w, h) {
    var $canvas = document.createElement("canvas");
    $canvas.width = w;
    $canvas.height = h;
    return $canvas;
  } : function () {
    return {
      getContext: function () {
        return {};
      },
    };
  };

  /**
   * Disables image smoothing for given CanvasRenderingContext2D.
   */
  CanvasFactory.prototype.disableContextImageSmoothing = function (context) {
    context.mozImageSmoothingEnabled = false;
    context.oImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
  };

  /**
   * Resizes given canvas or image element to given dimensions.
   */
  CanvasFactory.prototype.resizeImage = isBrowser() ? function($image, w, h) {
    var $canvas = this.createElement(w, h);
    var context = $canvas.getContext("2d");
    this.disableContextImageSmoothing(context);
    context.drawImage($image, 0, 0, w, h);

    var $result = new Image();
    $result.src = $canvas.toDataURL("image/png");
    return $result;
  } : function (image) {
    return image;
  };

  /**
   * Turns given canvas or image element into a data object useful for sending
   * to a server.
   */
  CanvasFactory.prototype.imageToDataObject = isBrowser() ? function ($image) {
    var $canvas = this.createElement($image.width, $image.height);
    var context = $canvas.getContext("2d");
    this.disableContextImageSmoothing(context);
    context.drawImage($image, 0, 0);

    return dataUriToObject($canvas.toDataURL());

    function dataUriToObject(data) {
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
      }
      result.mimetype = result.mimetype || "text/plain";
      result.charset = result.charset || "US-ASCII";
      result.encoding = result.encoding || "base64";
      return result;
    }

  } : function () {
    return {};
  };

  Object.freeze(CanvasFactory);

  function isBrowser() {
    return (typeof document !== "undefined");
  }

  module.exports = CanvasFactory;
}());
