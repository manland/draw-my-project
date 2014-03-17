angular.module('app').controller('FileViewCtrl', [
  '$scope', 'FileViewService',
  function($scope, fileViewService) {

    fileViewService.on('selectNode', function(node, isSelect) {
      if(isSelect === true) {
        $scope.selectedNodePath = node.filepath;
      } else {
        $scope.selectedNodePath = '';
      }
      $scope.$apply();
    });

  }

]);