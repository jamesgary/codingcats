(function() {

  define(['lib/webglHelpers', 'text!./frag.glsl', 'text!./vert.glsl'], function(webgl, fragShader, vertShader) {
    return {
      setup: function(params) {
        webgl.initGl(params.canvas);
        webgl.addVertexShaders([vertShader]);
        webgl.addFragmentShaders([fragShader]);
        this.setDimensions(params.width, params.height);
        webgl.setVar('cellColor', this.hexToGlslRgb(this.cellColor));
        webgl.setVar('minLiveNeighborRule', 2);
        webgl.setVar('maxLiveNeighborRule', 3);
        webgl.setVar('minDeadNeighborRule', 3);
        return webgl.setVar('maxDeadNeighborRule', 3);
      },
      start: function() {
        return webgl.animate();
      },
      pause: function() {
        return webgl.pause();
      },
      setDimensions: function(width, height) {
        return webgl.setDimensions(width, height);
      },
      setMouse: function(x, y) {
        return webgl.setMouse(x, y);
      },
      reset: function() {
        return webgl.reset();
      },
      fullScreen: function() {
        return webgl.fullScreen();
      },
      setCellColor: function(r, g, b) {
        return webgl.setVar('cellColor', this.glslRgb(r, g, b));
      },
      setPixelSize: function(pixelSize) {
        return webgl.setPixelSize(pixelSize);
      },
      setMinLiveNeighborRule: function(num) {
        return webgl.setVar('minLiveNeighborRule', num);
      },
      setMaxLiveNeighborRule: function(num) {
        return webgl.setVar('maxLiveNeighborRule', num);
      },
      setMinDeadNeighborRule: function(num) {
        return webgl.setVar('minDeadNeighborRule', num);
      },
      setMaxDeadNeighborRule: function(num) {
        return webgl.setVar('maxDeadNeighborRule', num);
      },
      cellColor: '22ff22',
      hexToGlslRgb: function(hex) {
        return this.glslRgb(parseInt(hex[0] + hex[1], 16), parseInt(hex[2] + hex[3], 16), parseInt(hex[4] + hex[5], 16));
      },
      glslRgb: function(r, g, b) {
        return [r / 255.0, g / 255.0, b / 255.0, 1.0];
      }
    };
  });

}).call(this);
