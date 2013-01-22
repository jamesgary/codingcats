(function() {
  var Grid;

  NB.Grid = Grid = (function() {

    function Grid(width, length) {
      var x, y, _ref, _ref2;
      this.width = width != null ? width : 10;
      this.length = length != null ? length : 10;
      this.cells = [];
      for (x = 0, _ref = this.length; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        this.cells[x] = [];
        for (y = 0, _ref2 = this.width; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          this.cells[x][y] = false;
        }
      }
    }

    Grid.prototype.generate = function() {
      var count, newCell, newCells, x, y, _ref, _ref2;
      newCells = [];
      for (x = 0, _ref = this.length; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        newCells[x] = [];
        for (y = 0, _ref2 = this.width; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
          count = this.getNeighborCount(x, y);
          newCell = this.shouldLive(this.cellAt(x, y), count);
          newCells[x][y] = newCell;
        }
      }
      return this.cells = newCells;
    };

    Grid.prototype.cellAt = function(x, y) {
      if ((x < 0 || y < 0) || (x >= this.length || y >= this.width)) return false;
      return this.cells[x][y];
    };

    Grid.prototype.randomize = function() {
      var x, y, _ref, _results;
      _results = [];
      for (x = 0, _ref = this.length; 0 <= _ref ? x < _ref : x > _ref; 0 <= _ref ? x++ : x--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (y = 0, _ref2 = this.width; 0 <= _ref2 ? y < _ref2 : y > _ref2; 0 <= _ref2 ? y++ : y--) {
            _results2.push(this.cells[x][y] = Math.random() > .5);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Grid.prototype.getNeighborCount = function(x, y) {
      var count;
      count = 0;
      count += this.cellAt(x - 1, y - 1);
      count += this.cellAt(x, y - 1);
      count += this.cellAt(x + 1, y - 1);
      count += this.cellAt(x - 1, y);
      count += this.cellAt(x + 1, y);
      count += this.cellAt(x - 1, y + 1);
      count += this.cellAt(x, y + 1);
      count += this.cellAt(x + 1, y + 1);
      return count;
    };

    Grid.prototype.shouldLive = function(isLiving, neighborCount) {
      var newCell;
      if (isLiving) {
        if (neighborCount < 2) {
          newCell = false;
        } else if (neighborCount === 2 || neighborCount === 3) {
          newCell = true;
        } else {
          newCell = false;
        }
      } else {
        if (neighborCount === 3) {
          newCell = true;
        } else {
          newCell = false;
        }
      }
      return newCell;
    };

    return Grid;

  })();

}).call(this);
