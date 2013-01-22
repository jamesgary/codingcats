(function() {

  NB.Director = {
    start: function() {
      this.stage = new NB.Stage();
      this.tick();
      return this.gameSpeed = 1;
    },
    tick: function() {
      webkitRequestAnimationFrame(NB.Director.tick);
      if (!NB.Director.gamesSpeed) NB.Director.gamesSpeed = 1;
      if (!NB.Director.paused) {
        NB.Director.stage.tick();
        if (NB.Director.gameSpeed > 1) NB.Director.stage.tick();
        if (NB.Director.gameSpeed > 2) NB.Director.stage.tick();
        if (NB.Director.gameSpeed > 2) NB.Director.stage.tick();
        return NB.Director.stage.draw();
      }
    },
    placeTower: function(tower, coordinates) {
      return this.level.placeTower(tower, coordinates);
    },
    canPlaceTower: function(tower, coordinates) {
      return this.level.canPlaceTower(tower, coordinates);
    },
    endGame: function(won) {
      if (!this.hasEnded) {
        if (won) {
          $('#victory_dialogue').fadeIn(200);
          return console.log('A winner is you!');
        } else {
          this.hasEnded = true;
          $('#defeat_dialogue').fadeIn(200);
          return console.log('A loser is you!');
        }
      }
    },
    startLevel: function(levelData) {
      this.unpause();
      this.hasEnded = false;
      this.level = levelData.level;
      return this.stage.load(this.level);
    },
    pause: function() {
      NB.Director.paused = true;
      return $('#pause_dialogue').show();
    },
    unpause: function() {
      this.paused = false;
      return $('#pause_dialogue').hide();
    },
    sendWave: function(index) {
      return this.level.sendWave(index);
    },
    startFromSplash: function() {
      return $('#levels_screen').fadeIn(200, function() {
        return $('#splash_screen').hide();
      });
    },
    chooseLevel: function(levelName) {
      var level;
      level = NB.levelData[levelName]();
      this.startLevel(level);
      $('#victory_dialogue').hide();
      $('#defeat_dialogue').hide();
      $('#game_screen').fadeIn(200, function() {
        return $('#levels_screen').hide();
      });
      return $('#buttons a.tower_chooser').each(function(index) {
        var $this, cost, dataset, tower_type;
        $this = $(this);
        dataset = this.dataset;
        if (tower_type = dataset.tower_type) {
          cost = (new NB.towerData[tower_type]()).cost;
          return $this.find('.cost').text(cost);
        }
      });
    },
    returnToLevels: function() {
      this.level = null;
      this.stage.clear();
      return $('#levels_screen').fadeIn(200, function() {
        return $('#game_screen').hide();
      });
    },
    mapHover: function(coordinates) {
      if (this.placeholderTower && this.placeholderTower.hovering && this.canPlaceTower(this.placeholderTower, coordinates)) {
        if (this.placeholderTower.coordinates) {
          this.level.removeTower(this.placeholderTower);
        }
        this.placeholderTower.coordinates = coordinates;
        this.placeholderTower.refreshRange();
        return this.placeTower(this.placeholderTower, coordinates);
      }
    },
    mapHoverWithSwatter: function(coordinates) {
      var cellX, cellY, dim, rangeCoordinates, x, y;
      dim = 32;
      x = coordinates[0];
      y = coordinates[1];
      cellX = parseInt(x / dim) * dim;
      cellY = parseInt(y / dim) * dim;
      rangeCoordinates = [[parseInt(x / dim), parseInt(y / dim)]];
      this.level.swatter.rangeCoordinates = rangeCoordinates;
      this.level.swatter.x = x;
      this.level.swatter.y = y;
      return this.level.swatter.range = [[cellX, cellY]];
    },
    mapClick: function(coordinates) {
      var tower;
      if (this.level.swatter) {
        return this.level.swatted(coordinates);
      } else {
        if (this.placeholderTower) this.placeholderTower.hovering = false;
        tower = this.level.map.cellAt(coordinates[0], coordinates[1]);
        if (tower) {
          if (this.activeTower) this.activeTower.unclick();
          this.activeTower = tower;
          return tower.clicked();
        } else {
          if (this.activeTower) {
            this.activeTower.unclick();
            return this.activeTower = null;
          }
        }
      }
    },
    clickTowerChooser: function(towerType, cost) {
      this.level.swatter = null;
      if (cost <= this.level.money) {
        if (this.activeTower) this.activeTower.unclick();
        return this.placeholderTower = new towerType();
      }
    },
    clickSwatter: function() {
      return this.level.swatter = {
        cost: 10,
        range: []
      };
    },
    turnPlaceholderTower: function(dir) {
      if (this.placeholderTower) return this.placeholderTower.direction = dir;
    },
    setPlaceholderTower: function() {
      var realTower;
      if (this.placeholderTower) {
        realTower = this.placeholderTower.promote();
        this.level.removeTower(this.placeholderTower);
        this.placeTower(realTower, realTower.coordinates);
        $('#dpad').hide();
        this.placeholderTower = null;
        return this.mapClick(realTower.coordinates);
      }
    },
    movedOutOfMap: function() {
      this.level.eraseCoordinates = null;
      this.level.swatter = null;
      if (this.placeholderTower) {
        $('#dpad').hide();
        this.level.removeTower(this.placeholderTower);
        return this.placeholderTower = null;
      }
    },
    setGameSpeed: function(speed) {
      this.gameSpeed = speed;
      $('#speed div').removeClass('highlight');
      return $("#speed #speed" + speed).addClass('highlight');
    }
  };

}).call(this);
