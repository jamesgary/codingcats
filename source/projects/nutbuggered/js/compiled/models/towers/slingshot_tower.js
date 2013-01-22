(function() {
  var SlingshotTower, SlingshotTowerPlaceholder,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.SlingshotTower = SlingshotTower = (function(_super) {

    __extends(SlingshotTower, _super);

    function SlingshotTower(coordinates) {
      var data;
      this.coordinates = coordinates;
      data = NB.towerData.SlingshotTower();
      SlingshotTower.__super__.constructor.call(this, data);
    }

    SlingshotTower.prototype.attack = function() {
      var attacked, creep, creeps, _i, _len;
      creeps = NB.Director.level.findCreep({
        range: this.range,
        limit: 1,
        priority: this.priority
      });
      for (_i = 0, _len = creeps.length; _i < _len; _i++) {
        creep = creeps[_i];
        creep.damage(this.power);
      }
      attacked = creeps.length > 0;
      if (attacked) this.drawAttack(creeps[0]);
      return attacked;
    };

    return SlingshotTower;

  })(NB.Tower);

  NB.SlingshotTowerPlaceholder = SlingshotTowerPlaceholder = (function(_super) {

    __extends(SlingshotTowerPlaceholder, _super);

    function SlingshotTowerPlaceholder(coordinates) {
      this.coordinates = coordinates;
      this.projectiles = [];
      this.cost = 0;
      this.radius = 1;
      if (!this.coordinates) this.hovering = true;
      this.shouldDrawRange = true;
    }

    SlingshotTowerPlaceholder.prototype.tick = function() {};

    SlingshotTowerPlaceholder.prototype.clicked = function() {
      SlingshotTowerPlaceholder.__super__.clicked.call(this);
      return NB.Director.setPlaceholderTower();
    };

    SlingshotTowerPlaceholder.prototype.drawUpgrades = function() {};

    SlingshotTowerPlaceholder.prototype.promote = function() {
      return new NB.SlingshotTower(this.coordinates);
    };

    return SlingshotTowerPlaceholder;

  })(NB.SlingshotTower);

}).call(this);
