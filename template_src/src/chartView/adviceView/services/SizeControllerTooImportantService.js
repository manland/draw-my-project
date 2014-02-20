angular.module('app').service('SizeControllerTooImportantService', [
  'ConstantsService',
  function(constantsService) {

    var advices, sizeByType;

    return {
      start: function(nodes) {
        advices = [];
        sizeByType = {};
      },
      visit: function(node) {
        sizeByType[node.type] = sizeByType[node.type] || 0;
        sizeByType[node.type] = sizeByType[node.type] + node.size;
      },
      end: function(nodes) {
        if(constantsService.getType() === 'angularjs' && 
           sizeByType['controller'] > (sizeByType['factory'] * 0.8)) {
          advices.push({
            node: undefined,
            name: 'Your controllers are too important compared to services !',
            gravityLevel: 2,
            gravity: 'hot'
          });
        }
        return advices;
      }
    };
  }
]);