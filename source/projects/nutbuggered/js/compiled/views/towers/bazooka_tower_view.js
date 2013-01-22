(function() {
  var BazookaProjectile;

  NB.BazookaTower.prototype.draw = function(ctx) {
    var dim, offset, projectile, quarterTurns, rotation, size, totalTurn, x, y, _i, _len, _ref, _results;
    this.drawRange(ctx);
    size = 64;
    dim = 32;
    offset = (size - dim) / 2;
    x = (this.coordinates[0] * dim) + offset;
    y = (this.coordinates[1] * dim) + offset;
    ctx.save();
    ctx.translate(x, y);
    quarterTurns = (function() {
      switch (this.direction) {
        case 'n':
          return 2;
        case 'e':
          return 3;
        case 's':
          return 0;
        case 'w':
          return 1;
      }
    }).call(this);
    totalTurn = quarterTurns * 90;
    rotation = totalTurn * Math.PI / 180;
    ctx.rotate(rotation);
    ctx.drawImage(NB.imageData.bazooka, -3 * offset, -3 * offset);
    ctx.restore();
    if (this.projectiles) {
      _ref = this.projectiles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        projectile = _ref[_i];
        _results.push(projectile.draw(ctx));
      }
      return _results;
    }
  };

  NB.BazookaTower.prototype.drawAttack = function() {
    var ctx, target;
    ctx = NB.Director.level.ctx;
    target = this.range[this.range.length - 1];
    this.projectiles.push(new NB.BazookaProjectile([this.coordinates[0] * 32, (this.coordinates[1] * 32) + 10], [target[0] * 32, (target[1] * 32) + 10]));
    return this.projectiles = this.projectiles.filter(NB.Projectile.removeOldFilter);
  };

  NB.BazookaProjectile = BazookaProjectile = (function() {

    function BazookaProjectile(origin, target) {
      this.origin = origin;
      this.target = target;
      this.age = 0;
      this.lifespan = 30;
    }

    BazookaProjectile.prototype.draw = function(ctx) {
      var lineargradient, transparencyMod;
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath();
      lineargradient = ctx.createLinearGradient(this.origin[0], this.origin[1], this.target[0], this.target[1]);
      transparencyMod = 1 - (this.age / this.lifespan);
      lineargradient.addColorStop(.2, "rgba(255,200,200," + (.4 * transparencyMod) + ")");
      lineargradient.addColorStop(1, "rgba(255,10,10," + (1 * transparencyMod) + ")");
      ctx.strokeStyle = lineargradient;
      ctx.moveTo(this.origin[0], this.origin[1]);
      ctx.lineTo(this.target[0], this.target[1]);
      ctx.stroke();
      this.age++;
      return this.dead = this.age >= this.lifespan;
    };

    return BazookaProjectile;

  })();

  NB.BazookaProjectile.lifespan = 30;

  NB.BazookaProjectile.removeOldFilter = function(element, index, array) {
    return !element.dead;
  };

}).call(this);
