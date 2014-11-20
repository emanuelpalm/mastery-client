(function () {
  "use strict";

  /**
   * An animation, which keeps track of frame changes.
   *
   * Instantiated with immutable type data common to all animations of the same
   * type.
   */
  function GameAnimation(typeData, state) {
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
    return 0;
  };

  GameAnimation.prototype.setProgram = function (identifier) {

  };

  GameAnimation.prototype.update = function (dt) {

  };

  module.exports = GameAnimation;
}());
