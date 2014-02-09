angular.module('publicApp').directive('datePicker', [
  'MonthService', 'WeekService',
  function(monthService, weekService) {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      template: monthService.template,
      link: function($scope, element, attrs) {
        monthService.link($scope, element, attrs);

      }
    };
  
  }

]);