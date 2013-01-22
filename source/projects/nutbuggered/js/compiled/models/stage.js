(function() {
  var Stage;

  NB.Stage = Stage = (function() {

    function Stage() {
      this.tickables = [];
      this.drawables = [];
    }

    Stage.prototype.load = function(obj) {
      if (obj.tick) this.tickables.push(obj);
      if (obj.draw) this.drawables.push(obj);
      if (obj.drawInit) return obj.drawInit();
    };

    Stage.prototype.tick = function() {
      var tickable, _i, _len, _ref, _results;
      _ref = this.tickables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        _results.push(tickable.tick());
      }
      return _results;
    };

    Stage.prototype.draw = function() {
      var drawable, _i, _len, _ref, _results;
      _ref = this.drawables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        drawable = _ref[_i];
        _results.push(drawable.draw());
      }
      return _results;
    };

    Stage.prototype.clear = function() {
      this.tickables = [];
      return this.drawables = [];
    };

    return Stage;

  })();

}).call(this);
