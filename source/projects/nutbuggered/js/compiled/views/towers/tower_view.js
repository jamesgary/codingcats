(function() {

  NB.Tower.prototype.drawRange = function(ctx) {
    var cell, dim, _i, _len, _ref, _results;
    dim = 32;
    if (this.range && this.shouldDrawRange) {
      _ref = this.range;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        ctx.fillStyle = "rgba(255,255,255,.3)";
        _results.push(ctx.fillRect(cell[0] * dim, cell[1] * dim, dim, dim));
      }
      return _results;
    }
  };

  NB.Tower.prototype.drawUpgrades = function() {
    var $power, $priority, $priorityButtons, $range, $special, $speed, cost, description, dmg, isChilly, nextUpgrade, power, powerCost, priority, rangeCost, rate, speedCost, tower;
    tower = this;
    $power = $('#upgrades .power');
    if (this.canUpgradePower) {
      $power.find('.can_upgrade').show();
      $power.find('.cannot_upgrade').hide();
      isChilly = this.constructor === NB.ChillyTower;
      power = isChilly ? this.power * 100 : this.power;
      $power.find('.orig').text(power);
      if (isChilly) {
        $power.find('.unit').text('%');
      } else {
        $power.find('.unit').text('dmg');
      }
      nextUpgrade = this.nextPowerUpgrade();
      if (nextUpgrade === null) {
        $power.find('.not_maxed').hide();
      } else {
        powerCost = nextUpgrade.cost;
        dmg = nextUpgrade.dmg;
        if (isChilly) dmg = Math.round(dmg * 100);
        $power.find('.not_maxed').show();
        $power.find('.new').text(dmg);
        $power.find('.cost').text(powerCost);
        $power.off('click', '.button');
        $power.on('click', '.button', function(e) {
          if (NB.Director.level.canAfford(powerCost)) {
            NB.Director.level.chargeMoney(powerCost);
            tower.upgradePower();
            return tower.drawUpgrades();
          }
        });
      }
    } else {
      $power.find('.can_upgrade').hide();
      $power.find('.cannot_upgrade').show();
    }
    $speed = $('#upgrades .speed');
    if (this.canUpgradeSpeed) {
      $speed.find('.can_upgrade').show();
      $speed.find('.cannot_upgrade').hide();
      $speed.find('.orig').text(this.speed);
      nextUpgrade = this.nextSpeedUpgrade();
      if (nextUpgrade === null) {
        $speed.find('.not_maxed').hide();
      } else {
        speedCost = nextUpgrade.cost;
        rate = nextUpgrade.rate;
        $speed.find('.not_maxed').show();
        $speed.find('.new').text(rate);
        $speed.find('.cost').text(speedCost);
        $speed.off('click', '.button');
        $speed.on('click', '.button', function(e) {
          if (NB.Director.level.canAfford(speedCost)) {
            NB.Director.level.chargeMoney(speedCost);
            tower.upgradeSpeed();
            return tower.drawUpgrades();
          }
        });
      }
    } else {
      $speed.find('.can_upgrade').hide();
      $speed.find('.cannot_upgrade').show();
    }
    $range = $('#upgrades .range');
    if (this.canUpgradeRange) {
      $range.find('.can_upgrade').show();
      $range.find('.cannot_upgrade').hide();
      $range.find('.orig').text(this.radius);
      nextUpgrade = this.nextRangeUpgrade();
      if (nextUpgrade === null) {
        $range.find('.not_maxed').hide();
      } else {
        rangeCost = nextUpgrade.cost;
        $range.find('.not_maxed').show();
        $range.find('.new').text(nextUpgrade.sq);
        $range.find('.cost').text(rangeCost);
        $range.off('click', '.button');
        $range.on('click', '.button', function(e) {
          if (NB.Director.level.canAfford(rangeCost)) {
            NB.Director.level.chargeMoney(rangeCost);
            tower.upgradeRange();
            return tower.drawUpgrades();
          }
        });
      }
    } else {
      $range.find('.can_upgrade').hide();
      $range.find('.cannot_upgrade').show();
    }
    $special = $('#upgrades .special');
    if (this.constructor === NB.BoxerTower || this.constructor === NB.BazookaTower) {
      $special.css('visibility', 'visible');
      nextUpgrade = this.nextSpecialUpgrade();
      if (nextUpgrade === null) {
        $special.find('.not_maxed').hide();
        $special.find('.maxed').show();
      } else {
        $special.find('.not_maxed').show();
        $special.find('.maxed').hide();
        cost = nextUpgrade.cost;
        description = nextUpgrade.description;
        $special.find('.desc').text(description);
        $special.find('.cost').text(cost);
        $special.off('click', '.button');
        $special.on('click', '.button', function(e) {
          if (NB.Director.level.canAfford(cost)) {
            NB.Director.level.chargeMoney(cost);
            tower.upgradeSpecial();
            return tower.drawUpgrades();
          }
        });
      }
    } else {
      $special.css('visibility', 'hidden');
    }
    $priority = $('#upgrades .priority');
    $priorityButtons = $priority.find('.button');
    $priority.off('click', '.button');
    if (this.canPrioritize) {
      $priorityButtons.removeClass('disabled');
      $priority.on('click', '.button', function(e) {
        var priority;
        switch (e.toElement.dataset.priority) {
          case 'first':
            priority = NB.Priorities.FIRST;
            break;
          case 'last':
            priority = NB.Priorities.LAST;
            break;
          case 'weakest':
            priority = NB.Priorities.WEAKEST;
            break;
          case 'strongest':
            priority = NB.Priorities.STRONGEST;
        }
        if (priority) tower.priority = priority;
        return tower.drawUpgrades();
      });
      priority = tower.priority.name;
      $priority.find("a").removeClass('highlight');
      $priority.find("a[data-priority=" + priority + "]").addClass('highlight');
    } else {
      $priorityButtons.addClass('disabled');
      $priorityButtons.removeClass('highlight');
    }
    return $('#upgrades').show();
  };

  NB.Tower.prototype.undrawUpgrades = function() {
    return $('#upgrades').hide();
  };

}).call(this);
