(function() {

  NB.Tree.prototype.draw = function(ctx) {
    var dim, healthBarOpts, healthPercentage, image, margin, nudgeRight, topMargin;
    healthPercentage = this.hp / this.maxHp;
    nudgeRight = 15;
    if (healthPercentage === 1) {
      image = NB.imageData.tree;
    } else {
      image = NB.imageData.tree_dmg1;
      if (healthPercentage < .66) image = NB.imageData.tree_dmg2;
      if (healthPercentage < .33) image = NB.imageData.tree_dmg3;
    }
    ctx.globalAlpha = 0.7;
    ctx.drawImage(image, this.x + nudgeRight, this.y);
    ctx.globalAlpha = 1;
    margin = 20;
    dim = 160;
    topMargin = 15;
    healthBarOpts = {
      ctx: ctx,
      x: this.x + margin + nudgeRight,
      y: this.y + topMargin,
      width: dim - (2 * margin),
      height: 4,
      hp: this.hp,
      maxHp: this.maxHp
    };
    return NB.ViewHelper.drawHealth(healthBarOpts);
  };

}).call(this);
