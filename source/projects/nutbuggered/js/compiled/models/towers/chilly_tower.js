(function() {
  var ChillyTower, ChillyTowerPlaceholder,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.ChillyTower = ChillyTower = (function(_super) {

    __extends(ChillyTower, _super);

    function ChillyTower(coordinates) {
      var data;
      this.coordinates = coordinates;
      data = NB.towerData.ChillyTower();
      ChillyTower.__super__.constructor.call(this, data);
      this.ticksUntilAttack = this.cooldown;
      this.canPrioritize = false;
    }

    ChillyTower.prototype.attack = function() {
      var attacked, creep, creeps, _i, _len;
      creeps = NB.Director.level.findCreep({
        range: this.range
      });
      for (_i = 0, _len = creeps.length; _i < _len; _i++) {
        creep = creeps[_i];
        creep.slow(this.power);
      }
      attacked = creeps.length > 0;
      return attacked;
    };

    ChillyTower.prototype.tick = function() {
      return this.attack();
    };

    return ChillyTower;

  })(NB.Tower);

  NB.ChillyTowerPlaceholder = ChillyTowerPlaceholder = (function(_super) {

    __extends(ChillyTowerPlaceholder, _super);

    function ChillyTowerPlaceholder(coordinates) {
      this.coordinates = coordinates;
      this.cost = 0;
      this.radius = 1;
      if (!this.coordinates) this.hovering = true;
      this.shouldDrawRange = true;
      this.shikoRotationDirection = 1;
      this.age = 0;
    }

    ChillyTowerPlaceholder.prototype.tick = function() {};

    ChillyTowerPlaceholder.prototype.clicked = function() {
      ChillyTowerPlaceholder.__super__.clicked.call(this);
      return NB.Director.setPlaceholderTower();
    };

    ChillyTowerPlaceholder.prototype.drawUpgrades = function() {};

    ChillyTowerPlaceholder.prototype.promote = function() {
      return new NB.ChillyTower(this.coordinates);
    };

    return ChillyTowerPlaceholder;

  })(NB.ChillyTower);

}).call(this);
