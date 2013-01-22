(function() {
  var Projectile;

  NB.SlingshotTower.prototype.draw = function(ctx) {
    var dim, offset, projectile, size, x, y, _i, _len, _ref, _results;
    this.drawRange(ctx);
    size = 64;
    dim = 32;
    offset = (size - dim) / 2;
    x = (this.coordinates[0] * dim) + offset;
    y = (this.coordinates[1] * dim) + offset;
    ctx.save();
    ctx.translate(x, y);
    if (this.aimingAngle) ctx.rotate(this.aimingAngle);
    ctx.drawImage(NB.imageData.slingshot, -2 * offset, -2 * offset);
    ctx.restore();
    _ref = this.projectiles;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      projectile = _ref[_i];
      _results.push(projectile.draw(ctx));
    }
    return _results;
  };

  NB.SlingshotTower.prototype.drawAttack = function(creep) {
    var ctx, dim, offset, origin, rotateSide, rotation, size, target, x, y;
    ctx = NB.Director.level.ctx;
    if (creep) {
      size = 64;
      dim = 32;
      offset = (size - dim) / 2;
      x = (this.coordinates[0] * dim) + offset;
      y = (this.coordinates[1] * dim) + offset;
      rotateSide = Math.random() > .5 ? 1 : -1;
      rotation = Math.atan2(creep.position[1] - this.coordinates[1], creep.position[0] - this.coordinates[0]) - (90 * Math.PI / 180);
      this.aimingAngle = rotation;
      this.targetCoordinates = creep.position;
      origin = [(this.coordinates[0] * dim) + offset + 8, (this.coordinates[1] * dim) + offset];
      target = [(this.targetCoordinates[0] * dim) + offset, (this.targetCoordinates[1] * dim) + offset];
      this.projectiles.push(new NB.Projectile(origin, target));
      return this.projectiles = this.projectiles.filter(NB.Projectile.removeOldFilter);
    }
  };

  NB.Projectile = Projectile = (function() {

    function Projectile(origin, target) {
      this.origin = origin;
      this.target = target;
      this.age = 0;
      this.lifespan = 15;
    }

    Projectile.prototype.draw = function(ctx) {
      var lineargradient, transparencyMod;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      lineargradient = ctx.createLinearGradient(this.origin[0], this.origin[1], this.target[0], this.target[1]);
      transparencyMod = 1 - (this.age / this.lifespan);
      lineargradient.addColorStop(.2, "rgba(255,255,255," + (.2 * transparencyMod) + ")");
      lineargradient.addColorStop(1, "rgba(200,200,200," + (1 * transparencyMod) + ")");
      ctx.strokeStyle = lineargradient;
      ctx.moveTo(this.origin[0], this.origin[1]);
      ctx.lineTo(this.target[0], this.target[1]);
      ctx.stroke();
      this.age++;
      return this.dead = this.age >= this.lifespan;
    };

    return Projectile;

  })();

  NB.Projectile.lifespan = 15;

  NB.Projectile.removeOldFilter = function(element, index, array) {
    return !element.dead;
  };

}).call(this);
