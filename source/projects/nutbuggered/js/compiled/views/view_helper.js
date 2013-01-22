(function() {

  NB.ViewHelper = {
    drawHealth: function(opts) {
      var border, ctx, hp, hpBarHeight, hpBarWidth, maxHp, x, y;
      ctx = opts.ctx;
      x = opts.x;
      y = opts.y;
      hpBarWidth = opts.width;
      hpBarHeight = opts.height;
      hp = opts.hp;
      maxHp = opts.maxHp;
      border = 1;
      ctx.fillStyle = "#000000";
      ctx.fillRect(x - border, y - border, hpBarWidth + (2 * border), hpBarHeight + (2 * border));
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(x, y, hpBarWidth, hpBarHeight);
      if (hp < maxHp) {
        ctx.fillStyle = "#ff0000";
        return ctx.fillRect(x, y, ((maxHp - hp) / maxHp) * hpBarWidth, hpBarHeight);
      }
    },
    pixelateImage: function(image, canvas) {
      var a, b, context, g, i, imgData, offtx, r, x, y, _ref, _results;
      console.log(canvas);
      context = canvas.getContext('2d');
      offtx = document.createElement('canvas').getContext('2d');
      console.log(image);
      offtx.drawImage(image, 0, 0);
      console.log(image.width);
      console.log(image.height);
      imgData = offtx.getImageData(0, 0, image.width, image.height).data;
      _results = [];
      for (x = 0, _ref = image.width; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = image.height; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
            console.log([x, y]);
            i = (y * image.width + x) * 4;
            r = imgData[i];
            g = imgData[i + 1];
            b = imgData[i + 2];
            a = imgData[i + 3];
            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
            _results2.push(ctx.fillRect(x * zoom, y * zoom, zoom, zoom));
          }
          return _results2;
        })());
      }
      return _results;
    }
  };

}).call(this);
