define('helper/EntityHelper', function() {

  var getPosition = function getPosition(entity) {
    return {
      x: entity.transformComponent.transform.translation.x,
      y: entity.transformComponent.transform.translation.y,
      z: entity.transformComponent.transform.translation.z
    };
  };

  var getRadius = function getRadius(entity) {
    if(entity && 
      entity.meshDataComponent && 
      entity.meshDataComponent.meshData && 
      entity.meshDataComponent.meshData.radius) {
      return entity.meshDataComponent.meshData.radius;
    }
    return 0;
  };

  return {
    getPosition: function(entity) {
      return getPosition(entity);
    },
    getDistance: function(entity1, entity2) {
      var e1 = getPosition(entity1);
      var e2 = getPosition(entity2);
      var d = Math.sqrt(Math.pow((e1.x-e2.x), 2) + Math.pow((e1.y-e2.y), 2) + Math.pow((e1.z-e2.z), 2));
      d = Math.abs(d);
      d = d - getRadius(entity1) - getRadius(entity2);
      return d;
    }
  };

});