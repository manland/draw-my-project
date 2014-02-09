define('component/SkydomComponent', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'util/OptionsUtil',
  'helper/MathHelper'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  OptionsUtil,
  MathHelper
  ) {
  
  'use strict';

  function SkydomComponent(world) {
    this.type = 'SkydomComponent';


    var meshDetails = OptionsUtil.get('meshDetails');
    var shape = ShapeCreator.createSphere(5*meshDetails, 5*meshDetails, 5);
    var material = new ColoredMaterial.buildFarStar();

    for(var i=0; i<100; i++) {
      var pos = MathHelper.randomSpherePoint(0, 0, 0, 1000);
      var entity = EntityUtils.createTypicalEntity( world, shape, material );
      entity.transformComponent.setTranslation( pos.x, pos.y, pos.z );
      entity.addToWorld();
    }
  }

  SkydomComponent.prototype = Object.create(Component.prototype);

  return SkydomComponent;

});