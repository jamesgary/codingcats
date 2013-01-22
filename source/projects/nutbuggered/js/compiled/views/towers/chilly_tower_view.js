(function() {

  NB.ChillyTower.prototype.draw = function(ctx) {
    var ageOffsetX, ageOffsetY, cell, dim, mod, offset, size, snowX, snowY, x, y, _i, _len, _ref, _results;
    this.drawRange(ctx);
    size = 64;
    dim = 32;
    offset = (size - dim) / 2;
    x = (this.coordinates[0] * dim) - offset;
    y = (this.coordinates[1] * dim) - offset;
    snowX = (this.coordinates[0] * dim) - (offset * 2);
    snowY = (this.coordinates[1] * dim) - (offset * 2);
    ctx.drawImage(NB.imageData.chilly, x, y);
    this.age++;
    mod = this.power || .2;
    ageOffsetX = Math.sin(this.age / 100) * -100 * this.power;
    ageOffsetY = (this.age * 4 * this.power) + 1000;
    if (this.range) {
      _ref = this.range;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cell = _ref[_i];
        _results.push(ctx.drawImage(NB.imageData.snow, Math.abs(((cell[0] * dim) + ageOffsetX) % 96), 96 - Math.abs(((cell[1] * -dim) + ageOffsetY) % 96), dim, dim, cell[0] * dim, cell[1] * dim, dim, dim));
      }
      return _results;
    }
  };

  NB.ChillyTower.prototype.drawAttack = function() {};

}).call(this);
