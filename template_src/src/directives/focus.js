angular.module('app').directive('focus', [
  'ChartViewService',
  function(chartViewService) {

    return function (scope, element) {
      chartViewService.on('switchFilter', function(isShow) {
        if(isShow === true) {
          element[0].focus();
        }
      });
      element[0].focus();
    };

  }
]);