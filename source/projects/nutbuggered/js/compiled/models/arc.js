(function() {
  var Arc;

  NB.Arc = Arc = (function() {

    function Arc(coordinate1, coordinate2) {
      this.start = coordinate1;
      this.finish = coordinate2;
      if (this.isHorizontal = this.start[1] === this.finish[1]) {
        this.direction = this.start[0] < this.finish[0] ? 1 : -1;
      } else {
        this.direction = this.start[1] < this.finish[1] ? 1 : -1;
      }
    }

    Arc.prototype.contains = function(coordinate) {
      if ((coordinate[0] === this.start[0] && coordinate[1] === this.start[1]) || (coordinate[0] === this.finish[0] && coordinate[1] === this.finish[1])) {
        return true;
      }
      if (this.isHorizontal) {
        return coordinate[1] === this.start[1] && ((coordinate[0] >= this.start[0]) === (coordinate[0] <= this.finish[0]));
      } else {
        return coordinate[0] === this.start[0] && ((coordinate[1] >= this.start[1]) === (coordinate[1] <= this.finish[1]));
      }
    };

    Arc.prototype.travel = function(coordinate, distance) {
      var diff;
      distance *= this.direction;
      if (this.isHorizontal) {
        coordinate = [coordinate[0] + distance, coordinate[1]];
      } else {
        coordinate = [coordinate[0], coordinate[1] + distance];
      }
      if (this.contains(coordinate)) {
        return coordinate;
      } else {
        if (this.isHorizontal) {
          diff = coordinate[0] - this.finish[0];
        } else {
          diff = coordinate[1] - this.finish[1];
        }
        return Math.abs(diff);
      }
    };

    Arc.prototype.distanceTraveledFor = function(coordinate) {
      if (this.isHorizontal) {
        return (coordinate[0] - this.start[0]) * this.direction;
      } else {
        return (coordinate[1] - this.start[1]) * this.direction;
      }
    };

    return Arc;

  })();

}).call(this);
