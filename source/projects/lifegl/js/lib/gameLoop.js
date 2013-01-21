(function() {

  define(function() {
    var raf;
    raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
    return {
      loop: function(f) {
        var step;
        step = function() {
          f();
          return raf(step);
        };
        return step();
      },
      loopThis: function(parentObject, functionName) {
        var step;
        step = function() {
          parentObject[functionName]();
          return raf(step);
        };
        return step();
      }
    };
  });

}).call(this);
