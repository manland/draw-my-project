define('manager/EntityManager', 
  ['component/StarComponent', 'helper/EntityHelper'], 
  function(StarComponent, EntityHelper) {

    var entities = [];
    var onNewEntities;
    var onRemoveEntity = [];

    return {
      addToWorld: function(world, entitiesToAdd) {
        //clear old entities
        for(var j=0, l=entities.length; j<l; j++) {
          entities[j].entity.removeFromWorld();
        }
        entities = [];
        //add new entities
        for(var i=0, len=entitiesToAdd.length; i<len; i++) {
          entities.push(new StarComponent(world, entitiesToAdd[i].position, i===0));
        }
        if(onNewEntities) {
          onNewEntities(entities);
        }
      },
      checkCollision: function(entity) {
        for(var i=0, len=entities.length; i<len; i++) {
          if(EntityHelper.getDistance(entity, entities[i].entity) < 0) {
            
            entity.beeDataComponent.collide(entities[i]);
            entities[i].collide(entity.beeDataComponent);
            if(entities[i].isDead()) {
              var e = entities[i].entity;
              entities.splice(i, 1);
              for(var c=0, l=onRemoveEntity.length; c<l; c++) {
                onRemoveEntity[c](e, len-1);
              }
              len = entities.length;
            }
            if(entity.beeDataComponent.isDead()) {
              return;
            }
          }
        }
      },
      redrawAllEntities: function(world) {
        var temp = [], i, len;
        for(i=entities.length-1; i>-1; i--) {
          entities[i].entity.removeFromWorld();
          temp.push({position: EntityHelper.getPosition(entities[i].entity)});
        }
        entities = [];
        for(i=0, len=temp.length; i<len; i++) {
          entities.push(new StarComponent(world, temp[i].position, i===0));
        }
      },
      onNewEntities: function(callback) {
        onNewEntities = callback;
      },
      onRemoveEntity: function(callback) {
        onRemoveEntity.push(callback);
      }
    };
  }
);