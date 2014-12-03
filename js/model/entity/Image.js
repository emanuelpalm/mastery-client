(function () {
  "use strict";

  var GameEntity = require("../../game/GameEntity.js");

  /**
   * Allows an HTMLImageElement to be treated as a GameEntity.
   *
   * Image inherits GameEntity.
   */
  function Image(element) {
    GameEntity.call(this, {
      sprite: {
        image: element,
        width: element.width,
        height: element.height,
        states: [
          [0, 0]
        ]
      },
      bounds: {
        x: 0,
        y: 0,
        width: 60,
        height: 60
      }
    });
    this.callback = function () {};
  }
  Image.prototype = Object.create(GameEntity.prototype);
  Image.prototype.constructor = Image;

  Image.prototype.toDataObject = function () {
    // TODO: Implement.
  };

  // TODO: Integrate this.
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

  module.exports = Image;
}());
