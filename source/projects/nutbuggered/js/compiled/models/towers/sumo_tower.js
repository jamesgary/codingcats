(function() {
  var SumoTower, SumoTowerPlaceholder,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.SumoTower = SumoTower = (function(_super) {

    __extends(SumoTower, _super);

    function SumoTower(coordinates) {
      var data;
      this.coordinates = coordinates;
      data = NB.towerData.SumoTower();
      SumoTower.__super__.constructor.call(this, data);
      this.ticksUntilAttack = this.cooldown;
      this.shikoRotationDirection = 1;
      this.canPrioritize = false;
    }

    SumoTower.prototype.attack = function() {
      var attacked, creep, creeps, _i, _len;
      creeps = NB.Director.level.findCreep({
        range: this.range
      });
      for (_i = 0, _len = creeps.length; _i < _len; _i++) {
        creep = creeps[_i];
        creep.damage(this.power);
      }
      attacked = creeps.length > 0;
      if (attacked) this.drawAttack(creeps[0]);
      return attacked;
    };

    SumoTower.prototype.tick = function() {
      var creeps, _ref;
      creeps = NB.Director.level.findCreep({
        range: this.range
      });
      if (creeps.length > 0) {
        if (this.ticksUntilAttack > 0) {
          return this.ticksUntilAttack--;
        } else {
          if (this.attack()) return this.ticksUntilAttack = this.cooldown;
        }
      } else {
        if ((0 < (_ref = this.ticksUntilAttack) && _ref < this.cooldown)) {
          return this.ticksUntilAttack--;
        } else {
          return this.ticksUntilAttack = this.cooldown;
        }
      }
    };

    return SumoTower;

  })(NB.Tower);

  NB.SumoTowerPlaceholder = SumoTowerPlaceholder = (function(_super) {

    __extends(SumoTowerPlaceholder, _super);

    function SumoTowerPlaceholder(coordinates) {
      this.coordinates = coordinates;
      this.cost = 0;
      this.radius = 1;
      if (!this.coordinates) this.hovering = true;
      this.shouldDrawRange = true;
      this.shikoRotationDirection = 1;
    }

    SumoTowerPlaceholder.prototype.tick = function() {};

    SumoTowerPlaceholder.prototype.clicked = function() {
      SumoTowerPlaceholder.__super__.clicked.call(this);
      return NB.Director.setPlaceholderTower();
    };

    SumoTowerPlaceholder.prototype.drawUpgrades = function() {};

    SumoTowerPlaceholder.prototype.promote = function() {
      return new NB.SumoTower(this.coordinates);
    };

    return SumoTowerPlaceholder;

  })(NB.SumoTower);

}).call(this);
