define('component/FinalZoneComponent', [
  'goo/entities/components/Component',
  'goo/math/Vector3',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'goo/shapes/Disk',
  'material/ColoredMaterial',
  'helper/InputHelper',
  'util/OptionsUtil'
], function (
  Component,
  Vector3,
  ShapeCreator,
  EntityUtils,
  Disk,
  ColoredMaterial,
  InputHelper,
  OptionsUtil
  ) {
  
  'use strict';

  function FinalZoneComponent(world, showHelper) {
    this.type = 'FinalZoneComponent';

    var meshDetails = OptionsUtil.get('meshDetails');
    this.shape = ShapeCreator.createSphere( 5*meshDetails, 5*meshDetails, 0.8);
    this.material = new ColoredMaterial.buildFinalZone();
    this.material.wireframe = true;

    this.entity = EntityUtils.createTypicalEntity( 
      world, 
      this.shape, 
      this.material
    );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  FinalZoneComponent.prototype = Object.create(Component.prototype);

  FinalZoneComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('FinalZone', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  return FinalZoneComponent;

});