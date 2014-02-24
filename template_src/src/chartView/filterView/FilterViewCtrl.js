angular.module('app').controller('FilterViewCtrl', [
  '$scope', 'FilterViewService',
  function($scope, filterViewService) {

    $scope.nodes = filterViewService.getNodes();

    $scope.mouseOver = function(nodeName) {
      filterViewService.mouseOver(nodeName);
    };

    $scope.mouseOut = function(nodeName) {
      filterViewService.mouseOut(nodeName);
    };

    $scope.mouseClick = function(nodeName) {
      filterViewService.mouseClick(nodeName);
    };

  }
]);