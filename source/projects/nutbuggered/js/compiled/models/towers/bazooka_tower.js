(function() {
  var BazookaTower, BazookaTowerPlaceholder,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.BazookaTower = BazookaTower = (function(_super) {

    __extends(BazookaTower, _super);

    function BazookaTower(coordinates, direction) {
      var data, x, y;
      this.coordinates = coordinates;
      this.direction = direction;
      data = NB.towerData.BazookaTower();
      BazookaTower.__super__.constructor.call(this, data);
      this.pierceLimit = 5;
      x = this.coordinates[0];
      y = this.coordinates[1];
      this.canPrioritize = false;
    }

    BazookaTower.prototype.attack = function() {
      var attacked, creep, creeps, _i, _len;
      creeps = NB.Director.level.findCreep({
        range: this.range,
        limit: this.pierceLimit
      });
      for (_i = 0, _len = creeps.length; _i < _len; _i++) {
        creep = creeps[_i];
        creep.damage(this.power);
      }
      attacked = creeps.length > 0;
      if (attacked) this.drawAttack(creeps[0]);
      return attacked;
    };

    BazookaTower.prototype.refreshRange = function() {
      var i, x, y, _ref, _results;
      x = this.coordinates[0];
      y = this.coordinates[1];
      this.range = [];
      _results = [];
      for (i = 1, _ref = this.radius; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        _results.push(this.range.push((function() {
          switch (this.direction) {
            case 'n':
              return [x, y - i];
            case 'e':
              return [x + i, y];
            case 's':
              return [x, y + i];
            case 'w':
              return [x - i, y];
          }
        }).call(this)));
      }
      return _results;
    };

    BazookaTower.prototype.nextRangeUpgrade = function() {
      return this.upgrades.range[0] || null;
    };

    BazookaTower.prototype.upgradeRange = function() {
      if (this.coordinates) {
        this.radius = this.upgrades.range[0].sq;
        this.refreshRange();
      }
      return this.upgrades.range.shift();
    };

    BazookaTower.prototype.upgradeSpecial = function() {
      if (this.upgrades.special.length === 2) {
        this.pierceLimit = 10;
      } else {
        this.pierceLimit = 25;
      }
      return this.upgrades.special.shift();
    };

    return BazookaTower;

  })(NB.Tower);

  NB.BazookaTowerPlaceholder = BazookaTowerPlaceholder = (function(_super) {

    __extends(BazookaTowerPlaceholder, _super);

    function BazookaTowerPlaceholder(coordinates) {
      var data;
      this.coordinates = coordinates;
      this.direction = 's';
      this.cost = 0;
      this.radius = data = NB.towerData.BazookaTower().upgrades.range[0].sq;
      if (!this.coordinates) this.hovering = true;
      this.shouldDrawRange = true;
    }

    BazookaTowerPlaceholder.prototype.tick = function() {
      var i, x, y, _ref, _results;
      x = this.coordinates[0];
      y = this.coordinates[1];
      this.range = [];
      _results = [];
      for (i = 1, _ref = this.radius; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        _results.push(this.range.push((function() {
          switch (this.direction) {
            case 'n':
              return [x, y - i];
            case 'e':
              return [x + i, y];
            case 's':
              return [x, y + i];
            case 'w':
              return [x - i, y];
          }
        }).call(this)));
      }
      return _results;
    };

    BazookaTowerPlaceholder.prototype.clicked = function() {
      BazookaTowerPlaceholder.__super__.clicked.call(this);
      return this.undrawUpgrades();
    };

    BazookaTowerPlaceholder.prototype.draw = function(ctx) {
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
      return BazookaTowerPlaceholder.__super__.draw.call(this, ctx);
    };

    BazookaTowerPlaceholder.prototype.drawUpgrades = function() {};

    BazookaTowerPlaceholder.prototype.promote = function() {
      return new NB.BazookaTower(this.coordinates, this.direction);
    };

    return BazookaTowerPlaceholder;

  })(NB.BazookaTower);

}).call(this);
