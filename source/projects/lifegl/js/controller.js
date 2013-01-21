(function() {

  define(['models/life/life', 'jquery', 'miniColors'], function(life, $) {
    return {
      setup: function() {
        var self;
        self = this;
        return $('document').ready(function() {
          self.setWindowListener();
          self.setMouseListener();
          self.setHiderListener();
          self.setPlayListener();
          self.setResetListener();
          self.setColorListener();
          self.setCellSizeListener();
          self.setLiveNeighborRuleListener();
          self.setDeadNeighborRuleListener();
          return self.startLife();
        });
      },
      setWindowListener: function() {
        return window.addEventListener("resize", function(event) {
          return life.setDimensions(window.innerWidth, window.innerHeight);
        }, false);
      },
      setMouseListener: function() {
        return window.addEventListener('mousemove', function(event) {
          return life.setMouse(event.clientX, event.clientY);
        }, false);
      },
      setHiderListener: function() {
        return $('.hide').click(function() {
          $('.dashboard').fadeToggle('fast');
          return $(this).toggleClass('hidden');
        });
      },
      setPlayListener: function() {
        return $('.playToggler').click(function() {
          var button;
          button = $(this);
          if (button.hasClass('pause')) {
            life.pause();
            button.removeClass('pause');
            button.addClass('play');
            return button.html("&#9658;");
          } else {
            life.start();
            button.removeClass('play');
            button.addClass('pause');
            return button.html('I I');
          }
        });
      },
      setResetListener: function() {
        return $('.reset').click(life.reset);
      },
      setColorListener: function() {
        var rgb2hex;
        rgb2hex = function(rgb) {
          var hex;
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
          hex = function(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
          };
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        };
        $('.colorPicker .cell').miniColors({
          opacity: false,
          change: function(hex, rgb) {
            return life.setCellColor(rgb.r, rgb.g, rgb.b);
          }
        }).miniColors('value', life.cellColor);
        return $('.colorPicker .background').miniColors({
          opacity: false,
          change: function(hex, rgb) {
            return $('body').css('background-color', hex);
          }
        }).miniColors('value', rgb2hex($('body').css('background-color')));
      },
      setCellSizeListener: function() {
        var $select, size, sizes, _i, _len;
        sizes = [1, 2, 3, 4, 5];
        $select = $('select.cellSize');
        for (_i = 0, _len = sizes.length; _i < _len; _i++) {
          size = sizes[_i];
          $select.append($('<option/>', {
            value: size,
            text: size
          }));
        }
        return $select.change(function() {
          size = this.value;
          return life.setPixelSize(size);
        });
      },
      setLiveNeighborRuleListener: function() {
        var $cellMax, $cellMin, self;
        $cellMin = $('select.liveCellMin');
        $cellMax = $('select.liveCellMax');
        this.giveOptions($cellMin, this.numToNum(0, 3));
        this.giveOptions($cellMax, this.numToNum(2, 8));
        self = this;
        $cellMin.change(function() {
          self.giveOptions($cellMax, self.numToNum(this.value, 8));
          return life.setMinLiveNeighborRule(this.value);
        });
        $cellMax.change(function() {
          self.giveOptions($cellMin, self.numToNum(0, this.value));
          return life.setMaxLiveNeighborRule(this.value);
        });
        $cellMin.val(2);
        return $cellMax.val(3);
      },
      setDeadNeighborRuleListener: function() {
        var $cellMax, $cellMin, self;
        $cellMin = $('select.deadCellMin');
        $cellMax = $('select.deadCellMax');
        this.giveOptions($cellMin, this.numToNum(0, 3));
        this.giveOptions($cellMax, this.numToNum(3, 8));
        self = this;
        $cellMin.change(function() {
          self.giveOptions($cellMax, self.numToNum(this.value, 8));
          return life.setMinDeadNeighborRule(this.value);
        });
        $cellMax.change(function() {
          self.giveOptions($cellMin, self.numToNum(0, this.value));
          return life.setMaxDeadNeighborRule(this.value);
        });
        $cellMin.val(3);
        return $cellMax.val(3);
      },
      startLife: function() {
        life.setup({
          canvas: $('canvas')[0],
          width: window.innerWidth,
          height: window.innerHeight
        });
        return life.start();
      },
      giveOptions: function($select, array) {
        var i, originalValue, _i, _len;
        originalValue = $select.val();
        $select.html('');
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          i = array[_i];
          $select.append($('<option/>', {
            value: i,
            text: i
          }));
        }
        return $select.val(originalValue);
      },
      numToNum: function(a, b) {
        var array;
        a = parseInt(a);
        b = parseInt(b);
        if (a > b) {
          return [];
        }
        array = [];
        while (a <= b) {
          array.push(a);
          a += 1;
        }
        return array;
      }
    };
  });

}).call(this);
