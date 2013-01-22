(function() {
  var Path;

  NB.Path = Path = (function() {

    function Path(coordinates) {
      var i;
      this.coordinates = coordinates;
      this.arcs = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.coordinates.length - 1; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push(new NB.Arc(this.coordinates[i], this.coordinates[i + 1]));
        }
        return _results;
      }).call(this);
    }

    Path.prototype.start = function() {
      return this.coordinates[0];
    };

    Path.prototype.finish = function() {
      return this.coordinates[this.coordinates.length - 1];
    };

    Path.prototype.travel = function(origin, distance) {
      var arc, i, result, _ref;
      for (i = 0, _ref = this.arcs.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        arc = this.arcs[i];
        if (arc.contains(origin)) {
          result = arc.travel(origin, distance);
          break;
        }
      }
      while (typeof result === 'number') {
        i++;
        arc = this.arcs[i];
        if (!arc) return false;
        result = arc.travel(arc.start, result);
      }
      return result;
    };

    Path.prototype.contains = function(coordinate) {
      var i, _ref;
      for (i = 0, _ref = this.arcs.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        if (this.arcs[i].contains(coordinate)) return true;
      }
      return false;
    };

    Path.prototype.sortCoordinates = function(coordinates) {
      var arc, arcCoordinates, c, sortByDistance, sortedCoordinates, _i, _j, _len, _len2, _ref;
      sortedCoordinates = [];
      _ref = this.arcs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        arc = _ref[_i];
        arcCoordinates = [];
        for (_j = 0, _len2 = coordinates.length; _j < _len2; _j++) {
          c = coordinates[_j];
          if (arc.contains(c)) arcCoordinates.push(c);
        }
        sortByDistance = function(a, b) {
          return arc.distanceTraveledFor(a) > arc.distanceTraveledFor(b);
        };
        arcCoordinates.sort(sortByDistance);
        sortedCoordinates = sortedCoordinates.concat(arcCoordinates);
      }
      return sortedCoordinates;
    };

    return Path;

  })();

}).call(this);
