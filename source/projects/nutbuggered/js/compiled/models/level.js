(function() {
  var Level;

  NB.Level = Level = (function() {

    Level.prototype.waveLifespan = 1800;

    function Level(data) {
      var waveData;
      this.waves = (function() {
        var _i, _len, _ref, _results;
        _ref = data.wavesData;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          waveData = _ref[_i];
          waveData.path = data.map.path;
          _results.push(new NB.Wave(waveData));
        }
        return _results;
      })();
      if (this.waves.length <= 10) {
        $('.wave.med').hide();
        $('.wave.hard').hide();
      } else if (this.waves.length <= 13) {
        $('.wave.med').show();
        $('.wave.hard').hide();
      } else {
        $('.wave.med').show();
        $('.wave.hard').show();
      }
      this.currentWaves = [];
      this.map = data.map;
      this.tree = data.tree;
      this.money = 500;
      this.currentWaveIndex = 0;
      this.currentWaveAge = 0;
      this.activeTower = null;
      $('#upgrades').hide();
    }

    Level.prototype.sendWave = function(index) {
      var _results;
      _results = [];
      while (this.currentWaveIndex < index) {
        _results.push(this.sendNextWave());
      }
      return _results;
    };

    Level.prototype.sendNextWave = function() {
      var currentWave;
      this.started = true;
      if (this.waves.isEmpty()) {
        return false;
      } else {
        currentWave = this.currentWaves[this.currentWaves.length - 1];
        if (currentWave) currentWave.boostIncubatingCreepsMoney();
        this.currentWaves.push(this.waves.shift());
        this.currentWaveIndex++;
        this.currentWaveAge = 0;
        return true;
      }
    };

    Level.prototype.tick = function() {
      var wave, _i, _len, _ref;
      if (this.started) {
        this.currentWaveAge++;
        if ((this.currentWaveAge > this.waveLifespan) && !this.waves.isEmpty()) {
          this.sendNextWave();
        }
      }
      _ref = this.currentWaves;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        wave = _ref[_i];
        wave.tick();
      }
      return this.map.tick();
    };

    Level.prototype.findCreep = function(criteria) {
      var allCreep, cell, creep, foundCreep, foundCreepInCell, limit, limitPerRange, priority, range, sorter, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _m, _n;
      range = criteria.range;
      priority = criteria.priority;
      limit = criteria.limit;
      limitPerRange = criteria.limitPerRange;
      sorter = this.createPrioritySorter(priority);
      allCreep = this.getAllCreep();
      foundCreep = [];
      if (limitPerRange) {
        for (_i = 0, _len = range.length; _i < _len; _i++) {
          cell = range[_i];
          foundCreepInCell = [];
          for (_j = 0, _len2 = allCreep.length; _j < _len2; _j++) {
            creep = allCreep[_j];
            if (creep.isInRange(cell)) foundCreepInCell.push(creep);
          }
          if (foundCreepInCell.length > limitPerRange) {
            foundCreepInCell = foundCreepInCell.sort(sorter);
            foundCreepInCell = foundCreepInCell.slice(0, limitPerRange);
          }
          foundCreep = foundCreep.concat(foundCreepInCell);
        }
      } else if (limit) {
        for (_k = 0, _len3 = range.length; _k < _len3; _k++) {
          cell = range[_k];
          for (_l = 0, _len4 = allCreep.length; _l < _len4; _l++) {
            creep = allCreep[_l];
            if (creep.isInRange(cell)) foundCreep.push(creep);
          }
        }
        if (foundCreep.length > limit) {
          foundCreep = foundCreep.sort(sorter);
          foundCreep = foundCreep.slice(0, limit);
        }
      } else {
        for (_m = 0, _len5 = range.length; _m < _len5; _m++) {
          cell = range[_m];
          for (_n = 0, _len6 = allCreep.length; _n < _len6; _n++) {
            creep = allCreep[_n];
            if (creep.isInRange(cell)) foundCreep.push(creep);
          }
        }
      }
      return foundCreep;
    };

    Level.prototype.placeTower = function(tower, coordinates) {
      this.map.placeTower(tower, coordinates);
      return this.chargeMoney(tower.cost);
    };

    Level.prototype.canPlaceTower = function(tower, coordinates) {
      return this.map.canPlaceTower(tower, coordinates);
    };

    Level.prototype.checkForVictory = function() {
      var wave, _i, _len, _ref;
      if (this.waves.length > 0) return false;
      _ref = this.currentWaves;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        wave = _ref[_i];
        if (wave.isAlive()) return false;
      }
      return true;
    };

    Level.prototype.notifyCompletionOf = function(completedWave) {
      this.currentWaves.remove(completedWave);
      if (this.currentWaves.isEmpty() && this.waves.isEmpty()) {
        return NB.Director.endGame(true);
      }
    };

    Level.prototype.removeTower = function(tower) {
      return this.map.removeTower(tower);
    };

    Level.prototype.grantMoney = function(dollars) {
      return this.money += dollars;
    };

    Level.prototype.chargeMoney = function(dollars) {
      return this.money -= dollars;
    };

    Level.prototype.canAfford = function(dollars) {
      return this.money >= dollars;
    };

    Level.prototype.swatted = function(coordinates) {
      var creep, _i, _len, _ref, _results;
      if (this.canAfford(this.swatter.cost)) {
        this.swatter.swatted = true;
        this.chargeMoney(this.swatter.cost);
        _ref = this.findCreep({
          range: this.swatter.rangeCoordinates,
          limit: 10
        });
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          creep = _ref[_i];
          _results.push(creep.damage(50));
        }
        return _results;
      }
    };

    Level.prototype.getAllCreep = function() {
      var allCreep, wave, _i, _len, _ref;
      allCreep = [];
      _ref = this.currentWaves;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        wave = _ref[_i];
        allCreep = allCreep.concat(wave.liveCreeps);
      }
      return allCreep;
    };

    Level.prototype.createPrioritySorter = function(priority) {
      var sorter;
      switch (priority) {
        case NB.Priorities.FIRST:
          sorter = function(a, b) {
            return a.traveled < b.traveled;
          };
          break;
        case NB.Priorities.LAST:
          sorter = function(a, b) {
            return a.traveled > b.traveled;
          };
          break;
        case NB.Priorities.STRONGEST:
          sorter = function(a, b) {
            return a.hp < b.hp;
          };
          break;
        case NB.Priorities.WEAKEST:
          sorter = function(a, b) {
            return a.hp > b.hp;
          };
          break;
        default:
          sorter = function(a, b) {
            return Math.random() > .5;
          };
      }
      return sorter;
    };

    return Level;

  })();

}).call(this);
