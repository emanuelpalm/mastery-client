(function () {
  "use strict";

  /**
   * An animation, which keeps track of frame changes.
   *
   * Instantiated with immutable type data common to all animations of the same
   * type.
   */
  function GameAnimation(typeData, frame) {
    this.typeData = typeData;
    this.program = typeData["default"];
    this.frame = frame || this.program.frames[0];
    this.currentInterval = this.program.interval;
  }

  GameAnimation.prototype.getFrame = function () {
    return this.frame;
  };

  GameAnimation.prototype.setProgram = function (identifier) {
    this.program = this.typeData[identifier];
    this.frame = this.program.frames[0];
    this.currentInterval = this.program.interval;
  };

  GameAnimation.prototype.update = function (dt) {
    var nextFrame = null;

    this.currentInterval -= dt;
    while (this.currentInterval <= 0.0) {
      if (++nextFrame >= this.program.frames.length) {
        nextFrame = 0;
      }
      this.currentInterval += this.program.interval;
    }
    if (nextFrame) {
      this.frame = this.program.frames[nextFrame];
      if (this.frame < 0) {
        this.frame = this.program.frames[Math.abs(nextFrame)];
      }
    }
  };

  module.exports = GameAnimation;
}());
