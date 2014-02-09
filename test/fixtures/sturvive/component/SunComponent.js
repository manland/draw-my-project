define('component/SunComponent', [
  'goo/entities/components/Component',
  'goo/renderer/light/PointLight',
  'goo/entities/EntityUtils',
  'helper/InputHelper'
], function (
  Component,
  PointLight,
  EntityUtils,
  InputHelper
  ) {
  
  'use strict';

  function SunComponent(world, showHelper) {
    this.type = 'SunComponent';

    this.entity = EntityUtils.createTypicalEntity( world, new PointLight() );
    this.entity.transformComponent.setTranslation( 0, 10, 0 );
    this.entity.beeDataComponent = this;
    this.entity.addToWorld();

    if(showHelper) {
      this.showHelper();
    }
  }

  SunComponent.prototype = Object.create(Component.prototype);

  SunComponent.prototype.showHelper = function() {
    var div = InputHelper.entity('Sun', this.entity);
  };

  return SunComponent;

});