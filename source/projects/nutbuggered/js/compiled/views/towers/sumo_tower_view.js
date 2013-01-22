(function() {

  NB.SumoTower.prototype.draw = function(ctx) {
    var a, dim, legDistX, legDistY, maxAngle, offset, qx, qy, rotation, rotationRadians, size, x, y;
    this.drawRange(ctx);
    size = 64;
    dim = 32;
    offset = (size - dim) / 2;
    x = (this.coordinates[0] * dim) + offset;
    y = (this.coordinates[1] * dim) + offset;
    maxAngle = 70;
    qx = -.5 + (this.ticksUntilAttack / this.cooldown);
    a = (-maxAngle) / Math.pow(.5, 2);
    qy = (a * (Math.pow(qx, 2))) + maxAngle;
    rotation = this.shikoRotationDirection * qy;
    rotationRadians = rotation * Math.PI / 180;
    legDistY = 15;
    legDistX = legDistY * this.shikoRotationDirection;
    ctx.save();
    ctx.translate(x + legDistX, y + legDistY);
    ctx.rotate(rotationRadians);
    ctx.drawImage(NB.imageData.sumo, (-2 * offset) - legDistX, (-2 * offset) - legDistY);
    return ctx.restore();
  };

  NB.SumoTower.prototype.drawAttack = function() {
    return this.shikoRotationDirection = -this.shikoRotationDirection;
  };

}).call(this);
