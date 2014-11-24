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
    this.frame = frame || 0;
    this.program = typeData["default"];
    this.currentInterval = 0.0;
/*
    var currentInterval = 0.0;
    var stateIndex = 0;
    var stateChanged = false;

    this.update = function (dt) {
      currentInterval -= dt;
      while (currentInterval <= 0.0) {
        if (++stateIndex >= states.length) {
          stateIndex = 0;
        }
        currentInterval += interval;
        stateChanged = true;
      }
      if (stateChanged) {
        var nextState = states[stateIndex];
        if (nextState < 0) {
          stateIndex = Math.abs(nextState);
          nextState = states[stateIndex];
        } 
        animatable.setState(nextState);
        stateChanged = false;
      }
    };
    */
  }

  GameAnimation.prototype.getFrame = function () {
    return this.frame;
  };

  GameAnimation.prototype.setProgram = function (identifier) {
    this.program = this.typeData[identifier];
  };

  GameAnimation.prototype.update = function (dt) {
    var doUpdate = false;

    this.currentInterval -= dt;
    while (this.currentInterval <= 0.0) {
      if (++this.frame >= this.program.frames.length) {
        this.frame = 0;
      }
      this.currentInterval += this.program.interval;
      doUpdate = true;
    }
    if (doUpdate) {
      var nextFrame = this.program.frames[this.frame];
      if (nextFrame < 0) {
        this.frame = this.program.frames[Math.abs(nextFrame)];
      } else {
        this.frame = nextFrame;
      }
    }
  };

  module.exports = GameAnimation;
}());
