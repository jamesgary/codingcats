(function() {

  NB.Map.prototype.drawInit = function() {
    var canvas, ctx, dim, image, startX, startY, x, xPos, y, yPos, _ref, _results;
    if (NB.imageData.loaded) {
      canvas = document.getElementById('background');
      ctx = canvas.getContext("2d");
      dim = 32;
      startX = this.path.start()[0];
      startY = this.path.start()[1];
      _results = [];
      for (x = 0, _ref = this.width; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.height; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
            if (x === startX && y === startY) {
              image = NB.imageData.spawner;
            } else {
              if (this.path.contains([x, y])) {
                image = NB.imageData.path;
              } else {
                image = NB.imageData.grass;
              }
            }
            xPos = x * dim;
            yPos = y * dim;
            _results2.push(ctx.drawImage(image, xPos, yPos));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    }
  };

  NB.Map.prototype.draw = function() {
    var canvas, ctx, tower, _i, _len, _ref, _results;
    canvas = document.getElementById('foreground');
    ctx = canvas.getContext("2d");
    _ref = this.towers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tower = _ref[_i];
      _results.push(tower.draw(ctx));
    }
    return _results;
  };

}).call(this);
