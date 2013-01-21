(function() {
  var __slice = [].slice;

  define(['lib/gameLoop'], function(gameLoop) {
    return {
      initGl: function(canvas) {
        this.canvas = canvas;
        return this.initialize();
      },
      animate: function() {
        this.compile();
        this.paused = false;
        return gameLoop.loopThis(this, 'render');
      },
      addFragmentShaders: function(shaders) {
        return this.addShaders(shaders, this.fragmentShaderStrategy);
      },
      addVertexShaders: function(shaders) {
        return this.addShaders(shaders, this.vertexShaderStrategy);
      },
      setDimensions: function(containerWidth, containerHeight) {
        this.containerWidth = containerWidth;
        this.containerHeight = containerHeight;
        return this.resetViewport();
      },
      resetViewport: function() {
        this.width = this.containerWidth / this.pixelSize;
        this.height = this.containerHeight / this.pixelSize;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl.viewport(0, 0, this.width, this.height);
        return this.createTargets();
      },
      setMouse: function(x, y) {
        return this.mouse = {
          x: x,
          y: y
        };
      },
      pause: function() {
        return this.paused = true;
      },
      reset: function() {
        return this.createTargets();
      },
      setVar: function(name, val) {
        return this.customVars[name] = val;
      },
      setPixelSize: function(pixelSize) {
        this.pixelSize = pixelSize;
        return this.resetViewport();
      },
      squareData: new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]),
      customVars: {},
      pixelSize: 1,
      containerWidth: 100,
      containerHeight: 100,
      initialize: function() {
        try {
          this.gl = this.canvas.getContext("experimental-webgl");
        } catch (_error) {}
        if (!this.gl) {
          throw "cannot create webgl context";
        }
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.squareData, this.gl.STATIC_DRAW);
        this.currentProgram = this.gl.createProgram();
        this.resetViewport();
        return this.start_time = new Date().getTime();
      },
      compile: function() {
        this.gl.linkProgram(this.currentProgram);
        if (!this.gl.getProgramParameter(this.currentProgram, this.gl.LINK_STATUS)) {
          console.error("VALIDATE_STATUS: " + this.gl.getProgramParameter(this.currentProgram, this.gl.VALIDATE_STATUS), "ERROR: " + this.gl.getError());
        }
        this.gl.useProgram(this.currentProgram);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.vertexAttribPointer(this.someVertexPosition, 2, this.gl.FLOAT, false, 0, 0);
        return this.gl.enableVertexAttribArray(this.someVertexPosition);
      },
      createTargets: function() {
        this.frontTarget = this.createTarget();
        return this.backTarget = this.createTarget();
      },
      createTarget: function() {
        var target;
        target = {};
        target.framebuffer = this.gl.createFramebuffer();
        target.renderbuffer = this.gl.createRenderbuffer();
        target.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, target.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, target.framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, target.texture, 0);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, target.renderbuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.width, this.height);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, target.renderbuffer);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        return target;
      },
      addShaders: function(shaders, shaderStrategy) {
        var errorMessage, shader, shaderObj, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = shaders.length; _i < _len; _i++) {
          shader = shaders[_i];
          shaderObj = shaderStrategy.call(this, shader);
          errorMessage = this.gl.getShaderInfoLog(shaderObj);
          if (errorMessage) {
            _results.push(console.log("SHADER ERROR: " + errorMessage));
          } else {
            _results.push(this.gl.attachShader(this.currentProgram, shaderObj));
          }
        }
        return _results;
      },
      vertexShaderStrategy: function(shader) {
        return this.createShader(shader, this.gl.VERTEX_SHADER);
      },
      fragmentShaderStrategy: function(shader) {
        return this.createShader(shader, this.gl.FRAGMENT_SHADER);
      },
      createShader: function(src, type) {
        var shader;
        shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);
        return shader;
      },
      render: function() {
        var name, val, _ref, _ref1, _ref2;
        if (this.paused || !this.currentProgram) {
          return;
        }
        this.gl.useProgram(this.currentProgram);
        this.gl.uniform1f(this.gl.getUniformLocation(this.currentProgram, "time"), new Date().getTime() - this.start_time);
        this.gl.uniform2f(this.gl.getUniformLocation(this.currentProgram, "resolution"), this.width, this.height);
        this.gl.uniform1i(this.gl.getUniformLocation(this.currentProgram, "backbuffer"), 0);
        if (this.mouse) {
          this.gl.uniform2f(this.gl.getUniformLocation(this.currentProgram, "mouse"), this.mouse.x / this.pixelSize, this.mouse.y / this.pixelSize);
        }
        _ref = this.customVars;
        for (name in _ref) {
          val = _ref[name];
          if (val.length === 4) {
            (_ref1 = this.gl).uniform4f.apply(_ref1, [this.gl.getUniformLocation(this.currentProgram, name)].concat(__slice.call(val)));
          } else {
            this.gl.uniform1f(this.gl.getUniformLocation(this.currentProgram, name), val);
          }
        }
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.backTarget.texture);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frontTarget.framebuffer);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        return _ref2 = [this.backTarget, this.frontTarget], this.frontTarget = _ref2[0], this.backTarget = _ref2[1], _ref2;
      }
    };
  });

}).call(this);
