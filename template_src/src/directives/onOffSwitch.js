angular.module('app').directive('onOffSwitch', [
  'OnOffSwitchService',
  function(onOffSwitchService) {

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        
        onOffSwitchService.onSwitch(function(isOn) {
          if(isOn === true) {
            element.addClass('on');
            element.removeClass('off');
          } else {
            element.addClass('off');
            element.removeClass('on');
          }
        });

      }
    };
  
  }

]);