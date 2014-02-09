require(
  [
    'helper/DomHelper', 
    'page/HomePage', 
    'page/CompatibilityPage', 
    'util/CompatibilityUtil'
  ], 
  function ( 
    DomHelper, 
    HomePage, 
    CompatibilityPage, 
    CompatibilityUtil) {
  
    'use strict';

    if(CompatibilityUtil.isCompatible() === true) {
      HomePage.show();
    } else {
      CompatibilityPage.show(HomePage.show);
    }
    DomHelper.showPage();
  
  }
);