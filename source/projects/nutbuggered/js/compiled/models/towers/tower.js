(function() {
  var Tower;

  NB.Tower = Tower = (function() {

    function Tower(data) {
      this.cost = data.cost;
      this.upgrades = data.upgrades;
      this.ticksUntilAttack = 0;
      this.priority = NB.Priorities.FIRST;
      this.shouldDrawRange = false;
      this.projectiles = [];
      this.canPrioritize = true;
      this.age = 0;
      this.canUpgradePower = !!this.upgrades.power;
      this.canUpgradeRange = !!this.upgrades.range;
      this.canUpgradeSpeed = !!this.upgrades.speed;
      this.canUpgradeSpecial = !!this.upgrades.special;
      if (this.canUpgradePower) this.upgradePower();
      if (this.canUpgradeRange) this.upgradeRange();
      if (this.canUpgradeSpeed) this.upgradeSpeed();
    }

    Tower.prototype.tick = function() {
      if (this.ticksUntilAttack > 0) {
        return this.ticksUntilAttack--;
      } else {
        if (this.attack()) return this.ticksUntilAttack = this.cooldown;
      }
    };

    Tower.prototype.attack = function() {
      return console.error('Error: Called NB.Tower#attack');
    };

    Tower.prototype.nextPowerUpgrade = function() {
      return this.upgrades.power[0] || null;
    };

    Tower.prototype.upgradePower = function() {
      this.power = this.upgrades.power[0].dmg;
      return this.upgrades.power.shift();
    };

    Tower.prototype.refreshRange = function() {
      var newX, newY, x, y, _ref, _ref2, _results;
      x = this.coordinates[0];
      y = this.coordinates[1];
      if (this.radius) {
        this.range = [];
        _results = [];
        for (newX = _ref = x - this.radius, _ref2 = x + this.radius; _ref <= _ref2 ? newX <= _ref2 : newX >= _ref2; _ref <= _ref2 ? newX++ : newX--) {
          _results.push((function() {
            var _ref3, _ref4, _results2;
            _results2 = [];
            for (newY = _ref3 = y - this.radius, _ref4 = y + this.radius; _ref3 <= _ref4 ? newY <= _ref4 : newY >= _ref4; _ref3 <= _ref4 ? newY++ : newY--) {
              _results2.push(this.range.push([newX, newY]));
            }
            return _results2;
          }).call(this));
        }
        return _results;
      }
    };

    Tower.prototype.nextRangeUpgrade = function() {
      return this.upgrades.range[0] || null;
    };

    Tower.prototype.upgradeRange = function() {
      if (this.coordinates) {
        this.radius = this.upgrades.range[0].sq;
        this.refreshRange();
      }
      return this.upgrades.range.shift();
    };

    Tower.prototype.nextSpeedUpgrade = function() {
      return this.upgrades.speed[0] || null;
    };

    Tower.prototype.upgradeSpeed = function() {
      this.speed = this.upgrades.speed[0].rate;
      this.cooldown = 60 * this.speed;
      return this.upgrades.speed.shift();
    };

    Tower.prototype.nextSpecialUpgrade = function() {
      return this.upgrades.special[0] || null;
    };

    Tower.prototype.clicked = function() {
      this.shouldDrawRange = true;
      if (!this.hovering) return this.drawUpgrades();
    };

    Tower.prototype.unclick = function() {
      this.shouldDrawRange = false;
      return this.undrawUpgrades();
    };

    return Tower;

  })();

}).call(this);
