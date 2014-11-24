(function () {
  "use strict";

  /**
   * An animation, which keeps track of frame changes.
   *
   * Instantiated with immutable type data common to all animations of the same
   * type.
   */
  function GameAnimation(typeData) {
    this.typeData = typeData;
    this.setProgram("default");
  }

  /**
   * Acquires current frame identifier.
   */
  GameAnimation.prototype.getFrame = function () {
    return this.frame;
  };

  /**
   * Sets animation program.
   */
  GameAnimation.prototype.setProgram = function (identifier) {
    this.program = this.typeData[identifier];
    this.frame = this.program.frames[0];
    this.index = 0;
    this.timeLeft = this.program.interval;
  };

  /**
   * Progresses animation in relation to given elapsed time since last update.
   */
  GameAnimation.prototype.update = function (dt) {
    this.timeLeft -= dt;
    while (this.timeLeft <= 0.0) {
      this.index += 1;
      if (this.index >= this.program.frames.length) {
        this.index = 0;
      }
      this.timeLeft += this.program.interval;
      this.refreshFrame();
    }
  };

  GameAnimation.prototype.refreshFrame = function () {
    this.frame = this.program.frames[this.index];
    while (this.frame < 0) {
      this.frame = this.program.frames[Math.abs(this.frame)];
    }
  };

  module.exports = GameAnimation;
}());
