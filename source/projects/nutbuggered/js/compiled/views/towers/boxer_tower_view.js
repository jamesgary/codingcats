(function() {

  NB.BoxerTower.prototype.draw = function(ctx) {
    var dim, offset, percentage, quarterTurns, rotation, size, totalTurn, x, y;
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
    if (this.range.length >= 8) {
      percentage = this.ticksUntilAttack / this.cooldown;
      if (percentage < .5) {
        totalTurn += this.punchRotationDirection * Math.pow(2 * percentage, 2) * 360;
      }
    } else {
      if (this.punchRotationDirection) {
        if (this.ticksUntilAttack > 0) {
          totalTurn += this.punchRotationDirection * Math.pow(this.ticksUntilAttack / this.cooldown, 7) * 60;
        }
      }
    }
    rotation = totalTurn * Math.PI / 180;
    ctx.rotate(rotation);
    ctx.drawImage(NB.imageData.boxer, -2 * offset, -2 * offset);
    return ctx.restore();
  };

  NB.BoxerTower.prototype.drawAttack = function() {
    var rotateSide;
    rotateSide = Math.random() > .5 ? 1 : -1;
    return this.punchRotationDirection = rotateSide;
  };

}).call(this);
