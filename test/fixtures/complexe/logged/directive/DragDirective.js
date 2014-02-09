angular.module('publicApp').directive('drag', [
  'DragAndDropService',
  function(dragAndDropService) {

    return {
      restrict: 'A',
      scope: {
        dragData: '='
      },
      link: function(scope, element, attrs) {
        scope.dragData.container = element[0];
        dragAndDropService.makeDraggable(scope.dragData);
      }
    };

  }
]);