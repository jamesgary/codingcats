(function() {
  var Map;

  NB.Map = Map = (function() {

    function Map() {
      var x, y, _ref, _ref2;
      this.height = 15;
      this.width = 15;
      this.cells = [];
      for (x = 0, _ref = this.width; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        this.cells[x] = [];
        for (y = 0, _ref2 = this.width; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          this.cells[x][y] = null;
        }
      }
    }

    Map.prototype.placeTower = function(tower, x, y) {
      if (this.cells[x][y] === null) {
        this.cells[x][y] = tower;
        return true;
      } else {
        return false;
      }
    };

    Map.prototype.cellAt = function(x, y) {
      return this.cells[x][y];
    };

    return Map;

  })();

}).call(this);
