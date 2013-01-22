(function() {

  NB.Level.prototype.drawInit = function() {
    this.canvas = document.getElementById('foreground');
    this.treeCanvas = document.getElementById('treeground');
    this.ctx = this.canvas.getContext("2d");
    this.treeCtx = this.treeCanvas.getContext("2d");
    return this.map.drawInit();
  };

  NB.Level.prototype.draw = function() {
    var cell, dim, size, wave, _i, _j, _len, _len2, _ref, _ref2;
    this.moveNeedle();
    $('#money').html(this.money);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.treeCtx.clearRect(0, 0, this.treeCanvas.width, this.treeCanvas.height);
    _ref = this.currentWaves;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      wave = _ref[_i];
      wave.draw(this.ctx);
    }
    this.map.draw(this.ctx);
    if (this.swatter) {
      dim = 32;
      this.ctx.fillStyle = "rgba(255,255,255,.3)";
      _ref2 = this.swatter.range;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        cell = _ref2[_j];
        this.ctx.fillRect(cell[0], cell[1], dim, dim);
      }
      if (this.swatter.swatted) this.swatter.hitLength = 5;
      if (this.swatter.hitLength && this.swatter.hitLength > 0) {
        this.ctx.drawImage(NB.imageData.swatterHit, this.swatter.x - 24, this.swatter.y - 24);
        this.swatter.hitLength--;
        this.swatter.swatted = false;
      } else {
        this.ctx.drawImage(NB.imageData.swatter, this.swatter.x - 24, this.swatter.y - 24);
      }
    }
    this.tree.draw(this.treeCtx);
    if (this.eraseCoordinates) {
      size = 70;
      return this.treeCtx.clearRect(this.eraseCoordinates[0] - size / 2, this.eraseCoordinates[1] - size / 2, size, size);
    }
  };

  NB.Level.prototype.moveNeedle = function() {
    var pos, waveHeight;
    waveHeight = 42;
    $('#needle').css('top', pos);
    if (this.currentWaveIndex === 0) {
      pos = 0;
    } else {
      pos = (this.currentWaveIndex - 1) * waveHeight;
      if (!(this.waves.isEmpty())) {
        pos += 42 * (this.currentWaveAge / this.waveLifespan);
      }
    }
    return $('#needle').css('top', parseInt(pos));
  };

  NB.Level.prototype.erase = function(coordinates) {
    return this.eraseCoordinates = coordinates;
  };

}).call(this);
