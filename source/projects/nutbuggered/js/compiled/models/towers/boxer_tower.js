(function() {
  var BoxerTower, BoxerTowerPlaceholder,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.BoxerTower = BoxerTower = (function(_super) {

    __extends(BoxerTower, _super);

    function BoxerTower(coordinates, direction) {
      var data, x, y;
      this.coordinates = coordinates;
      this.direction = direction;
      data = NB.towerData.BoxerTower();
      BoxerTower.__super__.constructor.call(this, data);
      x = this.coordinates[0];
      y = this.coordinates[1];
      this.range = [
        (function() {
          switch (this.direction) {
            case 'n':
              return [x, y - 1];
            case 'e':
              return [x + 1, y];
            case 's':
              return [x, y + 1];
            case 'w':
              return [x - 1, y];
          }
        }).call(this)
      ];
    }

    BoxerTower.prototype.attack = function() {
      var attacked, creep, creeps, _i, _len;
      creeps = NB.Director.level.findCreep({
        range: this.range,
        limitPerRange: 1,
        priority: this.priority
      });
      for (_i = 0, _len = creeps.length; _i < _len; _i++) {
        creep = creeps[_i];
        creep.damage(this.power);
      }
      attacked = creeps.length > 0;
      if (attacked) this.drawAttack();
      return attacked;
    };

    BoxerTower.prototype.canUpgradeRange = function() {
      return false;
    };

    BoxerTower.prototype.upgradeSpecial = function() {
      var ranges, x, y;
      x = this.coordinates[0];
      y = this.coordinates[1];
      if (this.upgrades.special.length === 2) {
        this.range.push((function() {
          switch (this.direction) {
            case 'n':
              return [x, y + 1];
            case 'e':
              return [x - 1, y];
            case 's':
              return [x, y - 1];
            case 'w':
              return [x + 1, y];
          }
        }).call(this));
      } else {
        ranges = [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1], [x - 1, y], [x + 1, y], [x - 1, y - 1], [x, y - 1], [x + 1, y - 1]];
        this.range = ranges;
      }
      return this.upgrades.special.shift();
    };

    return BoxerTower;

  })(NB.Tower);

  NB.BoxerTowerPlaceholder = BoxerTowerPlaceholder = (function(_super) {

    __extends(BoxerTowerPlaceholder, _super);

    function BoxerTowerPlaceholder(coordinates) {
      this.coordinates = coordinates;
      this.direction = 's';
      this.cost = 0;
      if (!this.coordinates) this.hovering = true;
      this.shouldDrawRange = true;
    }

    BoxerTowerPlaceholder.prototype.tick = function() {
      var x, y;
      x = this.coordinates[0];
      y = this.coordinates[1];
      return this.range = [
        (function() {
          switch (this.direction) {
            case 'n':
              return [x, y - 1];
            case 'e':
              return [x + 1, y];
            case 's':
              return [x, y + 1];
            case 'w':
              return [x - 1, y];
          }
        }).call(this)
      ];
    };

    BoxerTowerPlaceholder.prototype.clicked = function() {
      BoxerTowerPlaceholder.__super__.clicked.call(this);
      return this.undrawUpgrades();
    };

    BoxerTowerPlaceholder.prototype.draw = function(ctx) {
      var dim, dpad_img_size, offset, size, x, y;
      if (!(this.hasDrawn && this.coordinates)) {
        size = 64;
        dim = 32;
        offset = (dim - size) / 2;
        x = (this.coordinates[0] * dim) - offset;
        y = (this.coordinates[1] * dim) - offset;
        if (!this.hovering) {
          dpad_img_size = 250;
          offset = dpad_img_size / -2;
          $('#dpad').css('background-position-x', x + offset);
          $('#dpad').css('background-position-y', y + offset);
          $('#dpad').show();
          this.hasDrawn = true;
        }
      }
      return BoxerTowerPlaceholder.__super__.draw.call(this, ctx);
    };

    BoxerTowerPlaceholder.prototype.drawUpgrades = function() {};

    BoxerTowerPlaceholder.prototype.promote = function() {
      return new NB.BoxerTower(this.coordinates, this.direction);
    };

    return BoxerTowerPlaceholder;

  })(NB.BoxerTower);

}).call(this);
