(function() {

  NB.Creep.prototype.draw = function(ctx) {
    var dim, offset, size, x, xOffset, y, yOffset;
    size = 10;
    dim = 32;
    offset = (dim - size) / 2;
    x = this.position[0] * dim;
    y = this.position[1] * dim;
    xOffset = dim / 2;
    yOffset = dim / 2;
    ctx.beginPath();
    ctx.arc(x + xOffset, y + yOffset, size, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };

}).call(this);
