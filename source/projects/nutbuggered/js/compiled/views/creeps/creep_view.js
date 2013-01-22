(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  NB.Creep.prototype.draw = function(ctx) {
    var healthBarOpts, height, offset, x, y;
    this.size = this.size || 10;
    this.color = this.color || "Black";
    this.xFudge = this.xFudge || 10 - (20 * Math.random());
    this.yFudge = this.yFudge || 10 - (20 * Math.random());
    this.dim = 32;
    offset = (this.dim - this.size) / 2;
    x = this.position[0] * this.dim;
    y = this.position[1] * this.dim;
    this.drawBug(ctx);
    height = 3;
    healthBarOpts = {
      ctx: ctx,
      x: x + this.xFudge,
      y: y + this.yFudge,
      width: this.dim,
      height: 3,
      hp: this.hp,
      maxHp: this.maxHp
    };
    return NB.ViewHelper.drawHealth(healthBarOpts);
  };

  NB.Creep.prototype.drawBug = function(ctx) {
    var x, xOffset, y, yOffset;
    x = this.position[0] * this.dim;
    y = this.position[1] * this.dim;
    xOffset = (this.dim / 2) + this.xFudge;
    yOffset = (this.dim / 2) + this.yFudge;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x + xOffset, y + yOffset, this.size, 0, Math.PI * 2, true);
    ctx.closePath();
    return ctx.fill();
  };

  NB.Ant = NB.Ant = (function(_super) {

    __extends(Ant, _super);

    function Ant() {
      Ant.__super__.constructor.apply(this, arguments);
    }

    Ant.prototype.draw = function(ctx) {
      this.color = "#291606";
      this.size = 3;
      return Ant.__super__.draw.call(this, ctx);
    };

    Ant.prototype.drawBug = function(ctx) {
      var x, xOffset, y, yOffset;
      x = this.position[0] * this.dim;
      y = this.position[1] * this.dim;
      xOffset = (this.dim / 2) + this.xFudge;
      yOffset = (this.dim / 2) + this.yFudge;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(x + xOffset, y + yOffset, this.size, 0, Math.PI * 2, true);
      ctx.closePath();
      return ctx.fill();
    };

    return Ant;

  })(NB.Creep);

}).call(this);
