(function() {
  var Creep;

  NB.Creep = Creep = (function() {

    Creep.prototype.defaultHp = 150;

    Creep.prototype.defaultSpeed = .02;

    Creep.prototype.defaultWait = 120;

    Creep.prototype.defaultCount = 10;

    Creep.prototype.bitePower = .2;

    function Creep(data) {
      this.parentWave = data.parentWave;
      this.path = data.path;
      this.position = this.path.start();
      this.traveled = 0;
      this.slowMod = 1;
      this.speed = this.defaultSpeed * data.speedMod;
      this.hp = this.maxHp = this.defaultHp * data.hpMod;
      this.wait = this.defaultWait * data.waitMod;
      this.money = data.money;
    }

    Creep.prototype.tick = function() {
      var newPosition, speed;
      speed = this.speed * this.slowMod;
      newPosition = this.path.travel(this.position, speed);
      this.traveled += speed;
      if (newPosition) {
        this.position = newPosition;
      } else {
        NB.Director.level.tree.damage(this.bitePower);
      }
      return this.slowMod = 1;
    };

    Creep.prototype.isInRange = function(coordinate) {
      var coorX, coorY, posX, posY;
      posX = this.position[0];
      posY = this.position[1];
      coorX = coordinate[0];
      coorY = coordinate[1];
      return ((posX - .5 < coorX && coorX < posX + .5)) && ((posY - .5 < coorY && coorY < posY + .5));
    };

    Creep.prototype.damage = function(hp) {
      this.hp -= hp;
      if (this.hp <= 0) return this.die();
    };

    Creep.prototype.isAlive = function() {
      return this.health > 0;
    };

    Creep.prototype.die = function() {
      NB.Director.level.grantMoney(this.money);
      return this.parentWave.notifyDeathOf(this);
    };

    Creep.prototype.slow = function(percent) {
      return this.slowMod = 1 - percent;
    };

    return Creep;

  })();

}).call(this);
