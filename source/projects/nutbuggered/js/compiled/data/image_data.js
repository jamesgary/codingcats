(function() {

  NB.imageData = {
    loadAll: function() {
      this.boxer = new Image;
      this.boxer.src = "img/towers/boxer.png?" + (new Date().getTime());
      this.slingshot = new Image;
      this.slingshot.src = "img/towers/slingshot.png?" + (new Date().getTime());
      this.sumo = new Image;
      this.sumo.src = "img/towers/sumo.png?" + (new Date().getTime());
      this.chilly = new Image;
      this.chilly.src = "img/towers/chilly.png?" + (new Date().getTime());
      this.bazooka = new Image;
      this.bazooka.src = "img/towers/bazooka.png?" + (new Date().getTime());
      this.swatter = new Image;
      this.swatter.src = "img/swatter.png?" + (new Date().getTime());
      this.swatterHit = new Image;
      this.swatterHit.src = "img/swatter-hit.png?" + (new Date().getTime());
      this.grass = new Image;
      this.grass.src = "img/grass.png?" + (new Date().getTime());
      this.path = new Image;
      this.path.src = "img/path.png?" + (new Date().getTime());
      this.spawner = new Image;
      this.spawner.src = "img/spawner.png?" + (new Date().getTime());
      this.snow = new Image;
      this.snow.src = "img/snow.png?" + (new Date().getTime());
      this.tree = new Image;
      this.tree.src = "img/tree/tree.png?" + (new Date().getTime());
      this.tree_dmg1 = new Image;
      this.tree_dmg1.src = "img/tree/tree-dmg1.png?" + (new Date().getTime());
      this.tree_dmg2 = new Image;
      this.tree_dmg2.src = "img/tree/tree-dmg2.png?" + (new Date().getTime());
      this.tree_dmg3 = new Image;
      this.tree_dmg3.src = "img/tree/tree-dmg3.png?" + (new Date().getTime());
      return this.loaded = true;
    }
  };

}).call(this);
