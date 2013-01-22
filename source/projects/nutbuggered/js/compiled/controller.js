(function() {

  NB.Controller = {
    loadAll: function() {
      $('#splash_screen').on('click', '#start_from_splash', function(e) {
        return NB.Director.startFromSplash();
      });
      $('#levels_screen').on('click', '.level_chooser', function(e) {
        var levelName;
        levelName = e.currentTarget.dataset.map;
        return NB.Director.chooseLevel(levelName);
      });
      $('#game_screen').on('click', '#pause', function(e) {
        return NB.Director.pause();
      });
      $('#game_screen').on('click', '#unpause', function(e) {
        return NB.Director.unpause();
      });
      $('#game_screen').on('click', '#speed1', function(e) {
        return NB.Director.setGameSpeed(1);
      });
      $('#game_screen').on('click', '#speed2', function(e) {
        return NB.Director.setGameSpeed(2);
      });
      $('#game_screen').on('click', '#speed4', function(e) {
        return NB.Director.setGameSpeed(4);
      });
      $('#game_screen').on('click', '#waves .close, #waves .wave', function(e) {
        return $('#explainer').fadeOut(100);
      });
      $('#game_screen').on('click', '#waves li.wave', function(e) {
        return NB.Director.sendWave(parseInt(e.currentTarget.dataset.wave_index));
      });
      $('#game_screen').on('click', '.tower_chooser', function(e) {
        var cost, tower_type;
        tower_type = NB[e.currentTarget.dataset.tower_type_placeholder];
        cost = NB.towerData[e.currentTarget.dataset.tower_type]().cost;
        return NB.Director.clickTowerChooser(tower_type, cost);
      });
      $('#game_screen').on('mouseover', '.tower_chooser, .swatter', function(e) {
        var tower_name;
        if (NB.Director.activeTower) {
          NB.Director.activeTower.unclick();
          NB.Director.activeTower = null;
        }
        tower_name = e.currentTarget.dataset.name;
        $("#infospace #tower_descriptions > div").hide();
        $("#infospace #tower_descriptions ." + tower_name).show();
        return $("#infospace #tower_descriptions").show();
      });
      $('#game_screen').on('click', '.swatter', function(e) {
        return NB.Director.clickSwatter();
      });
      $('#game_screen').on('mousemove', '#map', function(e) {
        var x, y;
        x = NB.Director.currentX = e.offsetX;
        y = NB.Director.currentY = e.offsetY;
        if (NB.Director.level.swatter) {
          return NB.Director.mapHoverWithSwatter([x, y]);
        } else {
          x = parseInt(x / 32);
          y = parseInt(y / 32);
          return NB.Director.mapHover([x, y]);
        }
      });
      $('#game_screen').on('mouseleave', '#map', function(e) {
        return NB.Director.movedOutOfMap();
      });
      $('#game_screen').on('mousedown', '#map', function(e) {
        var x, y;
        $("#infospace #tower_descriptions").hide();
        x = parseInt(e.offsetX / 32);
        y = parseInt(e.offsetY / 32);
        return NB.Director.mapClick([x, y]);
      });
      $('#game_screen').on('mousemove', '#dpad', function(e) {
        var dir, dpadCenterX, dpadCenterY, dpadImgSize, dpadOffset, dpadStyle, mouseX, mouseY, xDiff, yDiff;
        dpadImgSize = 250;
        dpadOffset = dpadImgSize / 2;
        dpadStyle = e.target.style;
        dpadCenterX = dpadOffset + parseInt(dpadStyle.backgroundPositionX);
        dpadCenterY = dpadOffset + parseInt(dpadStyle.backgroundPositionY);
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        xDiff = dpadCenterX - mouseX;
        yDiff = dpadCenterY - mouseY;
        if (yDiff > Math.abs(xDiff)) {
          dir = 'n';
        } else if (Math.abs(yDiff) > Math.abs(xDiff)) {
          dir = 's';
        } else {
          dir = xDiff > 0 ? 'w' : 'e';
        }
        return NB.Director.turnPlaceholderTower(dir);
      });
      $('#game_screen').on('click', '#dpad', function(e) {
        NB.Director.setPlaceholderTower();
        return e.stopPropagation();
      });
      $('body').keypress(function(e) {
        var key, x, y;
        NB.Director.movedOutOfMap();
        key = String.fromCharCode(e.which);
        switch (key) {
          case 'a':
            $('.tower_chooser.boxer').click();
            break;
          case 's':
            $('.tower_chooser.slingshot').click();
            break;
          case 'd':
            $('.tower_chooser.sumo').click();
            break;
          case 'f':
            $('.tower_chooser.chilly').click();
            break;
          case 'g':
            $('.swatter').click();
            break;
          case 'b':
            $('.tower_chooser.bazooka').click();
            break;
          case ' ':
            [NB.Director.level.sendNextWave(), $('#explainer').fadeOut(100)];
            break;
          case '`':
            NB.Director.pause();
            break;
          case '1':
            NB.Director.setGameSpeed(1);
            break;
          case '2':
            NB.Director.setGameSpeed(2);
            break;
          case '3':
            NB.Director.setGameSpeed(4);
        }
        x = NB.Director.currentX;
        y = NB.Director.currentY;
        if (x && y) {
          if (NB.Director.level.swatter) {
            NB.Director.mapHoverWithSwatter([x, y]);
          } else {
            x = parseInt(x / 32);
            y = parseInt(y / 32);
            NB.Director.mapHover([x, y]);
          }
        }
        return e.stopPropagation();
      });
      $('#game_screen').on('click', '.return_to_levels', function(e) {
        return NB.Director.returnToLevels();
      });
      $('#game_screen').on('mousemove', '#map', function(e) {
        var x, y;
        x = parseInt(e.offsetX / 32);
        y = parseInt(e.offsetY / 32);
        return NB.Director.mapHover([x, y]);
      });
      return $('#game_screen').on('mousemove', '#map', function(e) {
        var x, y;
        x = parseInt(e.offsetX / 32);
        y = parseInt(e.offsetY / 32);
        return NB.Director.level.erase([e.offsetX, e.offsetY]);
      });
    }
  };

}).call(this);
