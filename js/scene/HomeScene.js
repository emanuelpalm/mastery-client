(function () {
  "use strict";

  function HomeScene() {

      this.load = function (assetLoader, done, failed) {
        console.log("load");
        done();
      };

      this.setup = function (toScene, load) {
        console.log("setup");
      };

      this.update = function (dt) {

      };

      this.record = function (camera) {

      };
  }

  module.exports = HomeScene;
}());
