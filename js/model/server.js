(function () {
  "use strict";

  var Promise = require("promise");
  var IO = require("socket.io-client");

  /**
   * Connects to given host using given account.
   *
   * Returns a promise fulfilled with a server object, if all went well.
   */
  exports.connect = function (account) {
    return new Promise(function (fulfill, reject) {
      var socket = IO("/", { forceNew: true });
      socket.on("connect", function () {
        var server = new Server(socket);
        waitForEntranceState(server)
          .then(identifySelf)
          .then(waitForLobbyState)
          .then(waitForWorldState)
          .then(waitForPartyData)
          .then(fulfill, function (error) {
            server.disconnect();
            reject(error);
          });
      });
      socket.on("connect_error", function (error) {
        reject(error);
      });
      socket.on("connect_timeout", function (error) {
        reject(error);
      });
    });

    function waitForEntranceState(server) {
      return waitForState(server, "entrance", 10000);
    }

    function waitForState(server, state, timeout) {
      return new Promise(function (fulfill, reject) {
        server.on("state", function (s) {
          if (state === s) {
            fulfill(server);
          } else {
            reject(new Error("Server responded with invalid state."));
          }
        });
        setTimeout(function () {
          reject(new Error("Server failed to declare client state."));
        }, timeout);
      });
    }

    function identifySelf(server) {
      return new Promise(function (fulfill) {
        server.identifyUsing(account);
        fulfill(server);
      });
    }

    function waitForLobbyState(server) {
      return waitForState(server, "lobby", 10000);
    }

    function waitForWorldState(server) {
      return waitForState(server, "world", 200000);
    }

    function waitForPartyData(server) {
      return new Promise(function (fulfill, reject) {
        server.on("party", function (partyData) {
          server.clearCallbacks();
          fulfill({ server: server, partyData: partyData });
        });
        setTimeout(function () {
          reject(new Error("Server failed to send party data."));
        }, 10000);
      });
    }
  };

  /**
   * Represents a game server.
   */
  function Server(socket) {
    this.socket = socket;
    this.callbacks = {};

    var that = this;

    this.socket.on("message", function (message) {
      if (that.callbacks.message) {
        that.callbacks.message(message);
      }
    });
    this.socket.on("party", function (partyData) {
      if (that.callbacks.party) {
        that.callbacks.party(partyData);
      }
    });
    this.socket.on("state", function (state) {
      if (that.callbacks.state) {
        that.callbacks.state(state);
      }
    });
  }

  /**
   * Sends account identification to server and determines which entity in world
   * belongs to current user.
   */
  Server.prototype.identifyUsing = function (account) {
    this.socket.emit("identification", {
      id: account.id,
      avatarUrl: account.avatarUrl,
    });
  };

  /**
   * Add server event listener.
   *
   * The emitted events are "message", "state", and "party".
   *
   * Registering the same event twice causes the old event to be overwritten.
   */
  Server.prototype.on = function (event, callback) {
    this.callbacks[event] = callback;
  };

  /**
   * Clears all currently set callbacks.
   */
  Server.prototype.clearCallbacks = function () {
    this.callbacks = {};
  };

  /**
   * Sends state of player to server.
   */
  Server.prototype.sendPlayerState = function (player) {
    var bounds = player.getBounds();
    var data = [[bounds.x, bounds.y],[bounds.dx, bounds.dy]];
    this.socket.send(data);
  };

  /**
   * Disconnects from server.
   */
  Server.prototype.disconnect = function () {
    this.socket.disconnect();
  };

  Object.seal(Server);
}());
