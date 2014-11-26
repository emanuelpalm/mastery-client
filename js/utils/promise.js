/**
 * Various convenience functions for dealing with common tasks with promises.
 *
 * @module utils/promise
 */
(function () {
  "use strict";

  var Promise = require("promise");

  /**
   */
  module.exports = {

    /**
     * Returns a promise that is fulfilled immediately with given data.
     */
    fulfill: function (data) {
      return new Promise(function (fulfill) {
        fulfill(data);
      });
    },

    /**
     * Returns a promise that is rejected immediately with given error.
     */
    reject: function (error) {
      return new Promise(function (_, reject) {
        reject(error);
      });
    },

    /**
     * Races array of promises against each other. The returned promise is
     * fulfilled with the data of the winner.
     *
     * If all promises are rejected in the array given, the returned promise is
     * rejected with the error of the last rejected promise.
     */
    race: function (promises) {
      return new Promise(function (fulfill, reject) {
        var pending = promises.length;

        promises.forEach(function (promise) {
          promise
            .then(fulfill)
            .catch(function (error) {
              pending -= 1;
              if (pending === 0) {
                reject(error);
              }
            });
        });
      });
    },

    /**
     * Starves array of promises. The returned promise is fulfilled with promise
     * which survive the longest.
     *
     * If all promises are rejected in the array given, the returned promise is
     * rejected with the error of the last rejected promise.
     */
    starve: function (promises) {
      return new Promise(function (fulfill, reject) {
        var pending = promises.length;
        var lastData = null, lastError;

        promises.forEach(function (promise) {
          promise
            .then(function (data) {
              lastData = data || true;
              completeJob();
            })
            .catch(function (error) {
              lastError = error;
              completeJob();
            });
        });

        function completeJob() {
          pending -= 1;
          if (pending === 0) {
            if (lastData) {
              fulfill(lastData);
            } else {
              reject(lastError);
            }
          }
        }
      });
    },

    /**
     * Returns a promise that is fulfilled in the given amount of milliseconds.
     *
     * Optionally some data may be given as second argument, which is then
     * passed when the promise is fulfilled.
     */
    timeout: function (timeInMs, data) {
      return new Promise(function (fulfill) {
        setTimeout(function () {
          fulfill(data);
        }, timeInMs);
      });
    },

    /**
     * Returns a promise that is rejected in the given amount of milliseconds.
     *
     * Optionally some error may be given as second argument, which is then
     * passed when the promise is rejected.
     */
    expire: function (timeInMs, error) {
      return new Promise(function (_, reject) {
        setTimeout(function () {
          reject(error);
        }, timeInMs);
      });
    },

  };

}());
