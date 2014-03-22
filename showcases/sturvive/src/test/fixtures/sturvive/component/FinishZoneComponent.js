define('component/FinishZoneComponent', [
  'goo/entities/components/Component',
  'goo/shapes/ShapeCreator',
  'goo/entities/EntityUtils',
  'material/ColoredMaterial',
  'helper/InputHelper',
  'helper/DomHelper',
  'util/OptionsUtil'
], function (
  Component,
  ShapeCreator,
  EntityUtils,
  ColoredMaterial,
  InputHelper,
  DomHelper,
  OptionsUtil
  ) {
  
  'use strict';

  function FinishZoneComponent(world, showHelper) {
    this.type = 'FinishZoneComponent';

    var meshDetails = OptionsUtil.get('meshDetails');
    this.shape = ShapeCreator.createSphere( 5*meshDetails, 5*meshDetails, 0.8);
    this.material = new ColoredMaterial.buildFinishZone();
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

  FinishZoneComponent.prototype = Object.create(Component.prototype);

  FinishZoneComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('FinishZone', this.entity);
    InputHelper.coloredMaterial('color', this.material, div);
  };

  return FinishZoneComponent;

});