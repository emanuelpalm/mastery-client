(function () {
  "use strict";

  var Player = require("../model/entity/Player.js");
  var Image = require("../model/entity/Image.js");
  var GameEntity = require("../game/GameEntity.js");
  var server = require("../model/server.js");

  /**
   * Represents the game world.
   *
   * The scene is created with the current player's account object.
   */
  function WorldScene(account) {
    this.name = "world";

    var srv = {};
    var tiles = [];
    var entities = [];
    var avatars = [];
    var userPlayer = null;
  
    this.load = function (assetLoader, done, failed) {
      assetLoader.load("/assets/batches/world.json")
        .then(function (batch) {
          server.connect(account)
            .then(function (data) {
              assetLoader.load(data.partyData)
                .then(function (partyData) {
                  srv = data.server;
                  try {
                    createGroundEntitiesUsing(batch);
                    createPlayerEntitiesUsing(batch, partyData);
                    createAvatarEntitiesUsing(batch, partyData);
                    done();
                  } catch (e) {
                    failed(e);
                  }
                }, failed);
            }, failed);
        }, failed);
    };

    function createGroundEntitiesUsing(batch) {
      tiles = new Array(20);
      for (var i = tiles.length; i-- !== 0;) {
        tiles[i] = new GameEntity(batch.environment.ground);
      }
      tiles[ 0].setPosition(0,   0);
      tiles[ 1].setPosition(64,  0);
      tiles[ 2].setPosition(128, 0);
      tiles[ 3].setPosition(192, 0);
      tiles[ 4].setPosition(256, 0);
      tiles[ 5].setPosition(0,   64);
      tiles[ 6].setPosition(64,  64);
      tiles[ 7].setPosition(128, 64);
      tiles[ 8].setPosition(192, 64);
      tiles[ 9].setPosition(256, 64);
      tiles[10].setPosition(0,   128);
      tiles[11].setPosition(64,  128);
      tiles[12].setPosition(128, 128);
      tiles[13].setPosition(192, 128);
      tiles[14].setPosition(256, 128);
      tiles[15].setPosition(0,   192);
      tiles[16].setPosition(64,  192);
      tiles[17].setPosition(128, 192);
      tiles[18].setPosition(192, 192);
      tiles[19].setPosition(256, 192);
    }

    function createPlayerEntitiesUsing(batch, partyData) {
      partyData.forEach(function (playerData, index) {
        var player = new Player(batch.players[index]);
        if (playerData.id === account.id) {
          userPlayer = player;
          userPlayer.skip = true;
        }
        entities.push(player);
      });
    }

    function createAvatarEntitiesUsing(batch, partyData) {
      avatars = new Array(partyData.length);
      partyData.forEach(function (playerData, index) {
        var avatar = new Image(playerData.avatar);
        avatar.setSize(batch.avatar.size.width, batch.avatar.size.height);
        var position = batch.avatar.positions[index];
        avatar.setPosition(position[0], position[1]);
        avatars[index] = avatar;
      });
    }

    this.setup = function () {
      srv.on("message", function (data) {
        data.forEach(function (entry, index) {
          var entity = entities[index];
          if (entity && entity.skip !== true) {
            entity.synchronize(entry);
          }
        });
      });

      setInterval(function () {
        srv.sendPlayerState(userPlayer);
      }, 100);

      return function (evt) {
        userPlayer.offerEvent(evt);
        if (evt.type === "back") {
          srv.disconnect();
        }
      };
    };
  
    this.update = function (dt) {
      entities.forEach(function (e) {
        e.update(dt);
      });
    };
  
    this.record = function (camera) {
      tiles.forEach(camera.record);
      entities.forEach(camera.record);
      avatars.forEach(camera.record);
    };
  }

  module.exports = WorldScene;
}());

