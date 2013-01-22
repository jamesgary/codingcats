(function() {
  var Tree;

  NB.Tree = Tree = (function() {

    function Tree(hp, coordinates) {
      this.hp = hp;
      this.maxHp = this.hp;
      this.x = (coordinates[0] * 32) - 80 + (32 / 2);
      this.y = (coordinates[1] * 32) - 80 + (32 / 2);
    }

    Tree.prototype.damage = function(hp) {
      this.hp -= hp;
      if (this.hp <= 0) return NB.Director.endGame(false);
    };

    Tree.prototype.healthPercentage = function() {
      return this.hp / this.maxHp;
    };

    return Tree;

  })();

}).call(this);
