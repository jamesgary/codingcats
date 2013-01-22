(function() {
  var Map;

  NB.Map = Map = (function() {

    function Map(data) {
      var x, y, _ref, _ref2;
      if (data == null) data = {};
      this.height = 16;
      this.width = 16;
      this.path = data.path != null ? data.path : new NB.Path([[7, 7], [7, 5], [2, 5], [2, 10], [13, 10]]);
      this.cells = [];
      for (x = 0, _ref = this.width; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        this.cells[x] = [];
        for (y = 0, _ref2 = this.width; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          this.cells[x][y] = null;
        }
      }
      this.towers = [];
    }

    Map.prototype.placeTower = function(tower, coordinates) {
      var x, y;
      x = coordinates[0];
      y = coordinates[1];
      if (this.canPlaceTower(tower, coordinates)) {
        this.cells[x][y] = tower;
        this.towers.push(tower);
        this.drawInit();
        return true;
      } else {
        return false;
      }
    };

    Map.prototype.canPlaceTower = function(tower, coordinates) {
      var cellOccupant, x, y;
      x = coordinates[0];
      y = coordinates[1];
      cellOccupant = this.cells[x][y];
      return (this.cells[x][y] === null || cellOccupant === tower) && !this.path.contains([x, y]);
    };

    Map.prototype.cellAt = function(x, y) {
      return this.cells[x][y];
    };

    Map.prototype.tick = function() {
      var tower, _i, _len, _ref, _results;
      _ref = this.towers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tower = _ref[_i];
        _results.push(tower.tick());
      }
      return _results;
    };

    Map.prototype.removeTower = function(tower) {
      var coordinates, x, y;
      coordinates = tower.coordinates;
      x = coordinates[0];
      y = coordinates[1];
      this.cells[x][y] = null;
      return this.towers.remove(tower);
    };

    return Map;

  })();

}).call(this);
