(function() {

  NB.Wave.prototype.draw = function(ctx) {
    var creep, _i, _len, _ref, _results;
    _ref = this.liveCreeps;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      creep = _ref[_i];
      _results.push(creep.draw(ctx));
    }
    return _results;
  };

}).call(this);
