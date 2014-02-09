define('script/RunEntityScript', 
  ['goo/math/Vector3', 'manager/EntityManager', 'helper/MathHelper'], 
  function (Vector3, EntityManager, MathHelper) {
  
  'use strict';

  var speed = 1;
  var maxLifeTime = 100;
  var callbacks = [];

  function RunEntityScript(yRotation, speed, maxLifeTime) {
    this.lifeTime = 0;
    this.maxLifeTime = maxLifeTime;

    var v = MathHelper.rotateVectorByYRad(new Vector3(0, 0, speed), yRotation);
    this.xBy = v.x;
    this.zBy = v.z;
  }

  RunEntityScript.prototype.onRun = function(callback) {
    callbacks.push(callback);
  };

  RunEntityScript.prototype.run = function(entity) {
    this.lifeTime = this.lifeTime + 1;
    if(this.maxLifeTime > -1 && this.lifeTime > this.maxLifeTime) {
      entity.removeFromWorld();
      return;
    }
    entity.transformComponent.addTranslation(this.xBy, 0, -this.zBy);

    EntityManager.checkCollision(entity);

    for(var i=0, len=callbacks.length; i<len; i++) {
      callbacks[i]();
    }
  };

  return RunEntityScript;

});