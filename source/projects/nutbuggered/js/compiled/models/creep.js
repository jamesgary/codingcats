(function() {
  var Creep;

  NB.Creep = Creep = (function() {

    Creep.prototype.defaultHp = 50;

    Creep.prototype.defaultSpeed = .01;

    Creep.prototype.defaultWait = 200;

    Creep.prototype.defaultCount = 10;

    function Creep(data) {
      this.path = NB.currentMap.path;
      this.position = this.path.start();
      this.speed = this.defaultSpeed * data.speedMod;
      this.hp = this.defaultHp * data.hpMod;
      this.wait = this.defaultWait * data.waitMod;
    }

    Creep.prototype.tick = function() {
      return this.position = this.path.travel(this.position, this.speed);
    };

    return Creep;

  })();

}).call(this);
