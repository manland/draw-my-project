angular.module('publicApp').directive('drop', [
  'DragAndDropService',
  function(dragAndDropService) {

    return {
      restrict: 'A',
      scope: {
        dropData: '=',
        dropCallback:'='
      },
      link: function(scope, element, attrs) {
        dragAndDropService.makeDroppable(element[0], function(dragData) {
          if(scope.dropCallback) {
            scope.dropCallback(dragData, scope.dropData);
          }
        });
      }
    };

  }
]);