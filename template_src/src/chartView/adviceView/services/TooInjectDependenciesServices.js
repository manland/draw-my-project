angular.module('app').service('TooInjectDependenciesServices', [
  'ConstantsService',
  function(constantsService) {

    var advices;

    return {
      start: function(nodes) {
        advices = [];
      },
      visit: function(node) {
        if(node.imports.length > 5) {
          var names = node.name.split(constantsService.getPathSeparator());
          var name = names[names.length - 1].split('.')[0];
          var sentence = name + ' has ' + node.imports.length + ' dependencies, it must have 5 at most.';
          if(node.imports.length > 10) {
            advices.push({
              node: node,
              name: sentence,
              gravityLevel: 2,
              gravity: 'hot'
            });
          } else if(node.imports.length > 5) {
            advices.push({
              node: node,
              name: sentence,
              gravityLevel: 1,
              gravity: 'significant'
            });
          }
        }
      },
      end: function(nodes) {
        return advices;
      }
    };
  }
]);