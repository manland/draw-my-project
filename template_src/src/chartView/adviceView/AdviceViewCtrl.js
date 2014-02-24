angular.module('app').controller('AdviceViewCtrl', [
  '$scope', 'AdviceViewService',
  function($scope, adviceViewService) {

    $scope.advices = adviceViewService.getAdvices();

    $scope.mouseOver = function(nodeName) {
      adviceViewService.mouseOver(nodeName);
    };

    $scope.mouseOut = function(nodeName) {
      adviceViewService.mouseOut(nodeName);
    };

    $scope.mouseClick = function(nodeName) {
      adviceViewService.mouseClick(nodeName);
    };
    
  }
]);