define('component/StarshipComponent', [
  'goo/entities/components/Component',
  'goo/shapes/Box',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'script/RunEntityScript',
  'helper/InputHelper'
], function (
  Component,
  Box,
  EntityUtils,
  ColoredMaterial,
  RunEntityScript,
  InputHelper
  ) {
  
  'use strict';

  function StarshipComponent(world, showHelper) {
    this.type = 'StarshipComponent';
    this.onDeadCallbacks = [];

    this.life = 1;
    this.power = 1000;

    this.shape = new Box(5, 5, 15, 0, 0);
    this.material = new ColoredMaterial.buildBullet();
    this.script = new RunEntityScript(0, 0.1, -1);

    this.entity = EntityUtils.createTypicalEntity( 
      world, 
      this.shape, 
      this.material,
      this.script
    );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  StarshipComponent.prototype = Object.create(Component.prototype);

  StarshipComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Starship', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  StarshipComponent.prototype.collide = function(otherEntity) {
    this.life = this.life - 1;
    if(this.life <= 0) {
      this.entity.removeFromWorld();
      for(var i=0, len=this.onDeadCallbacks.length; i<len; i++) {
        this.onDeadCallbacks[i]();
      }
    }
  };

  StarshipComponent.prototype.isDead = function() {
    return this.life <= 0;
  };

  StarshipComponent.prototype.onDead = function(callback) {
    this.onDeadCallbacks.push(callback);
  };

  return StarshipComponent;

});