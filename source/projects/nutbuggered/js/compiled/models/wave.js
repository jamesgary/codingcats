(function() {
  var Wave;

  NB.Wave = Wave = (function() {

    function Wave(data) {
      var CreepType, creepData, i, mold, numCreepToSpawn;
      creepData = data.creepData;
      creepData.path = data.path;
      creepData.parentWave = this;
      CreepType = creepData.type;
      mold = new CreepType(creepData);
      numCreepToSpawn = creepData.countMod * mold.defaultCount;
      this.age = 0;
      this.totalCreepsSpawned = 0;
      this.liveCreeps = [];
      this.incubatingCreeps = [];
      for (i = 1; 1 <= numCreepToSpawn ? i <= numCreepToSpawn : i >= numCreepToSpawn; 1 <= numCreepToSpawn ? i++ : i--) {
        this.incubatingCreeps.push(new CreepType(creepData));
      }
      this.waitTime = creepData.waitMod * mold.defaultWait;
      this.nextSpawnTime = 0;
    }

    Wave.prototype.tick = function() {
      var creep, _i, _len, _ref, _results;
      this.age++;
      if (this.shouldSpawn()) {
        this.liveCreeps.push(this.incubatingCreeps.pop());
        this.totalCreepsSpawned++;
        this.nextSpawnTime = this.totalCreepsSpawned * this.waitTime;
      }
      _ref = this.liveCreeps;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        creep = _ref[_i];
        _results.push(creep.tick());
      }
      return _results;
    };

    Wave.prototype.isAlive = function() {
      var creep, _i, _len, _ref;
      if (this.incubatingCreeps.length > 0) return true;
      _ref = this.liveCreeps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        creep = _ref[_i];
        if (creep.isAlive()) return true;
      }
      return false;
    };

    Wave.prototype.notifyDeathOf = function(creep) {
      this.liveCreeps.remove(creep);
      if (this.incubatingCreeps.isEmpty() && this.liveCreeps.isEmpty()) {
        return NB.Director.level.notifyCompletionOf(this);
      }
    };

    Wave.prototype.boostIncubatingCreepsMoney = function() {
      var creep, _i, _len, _ref, _results;
      _ref = this.incubatingCreeps;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        creep = _ref[_i];
        _results.push(creep.money = creep.money * 1.2);
      }
      return _results;
    };

    Wave.prototype.shouldSpawn = function() {
      return this.incubatingCreeps.length > 0 && this.age >= this.nextSpawnTime;
    };

    return Wave;

  })();

}).call(this);
