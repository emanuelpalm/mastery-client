(function () {
  "use strict";

  function LoginScene(gameMode) {

    this.setup = function (control) {
      control.onEvent(function (evt) {
        console.log(evt);
      });
      control.ready();
    };

    this.update = function (dt) {

    };

    this.record = function (camera) {

    };
  }

  module.exports = LoginScene;
}());
