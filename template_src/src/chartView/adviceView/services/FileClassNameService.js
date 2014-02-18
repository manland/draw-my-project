angular.module('app').service('FileClassNameService', [
  'ConstantsService',
  function(constantsService) {

    var advices;

    return {
      start: function(nodes) {
        advices = [];
      },
      visit: function(node) {
        if(node.filepath !== '') {
          var names = node.filepath.split('/');
          var filename = names[names.length - 1];
          filename = filename.split('.')[0];
          names = node.name.split(constantsService.getPathSeparator());
          var name = names[names.length - 1];
          name = name.split('.')[0];
          if(name.toUpperCase() !== filename.toUpperCase()) {
            advices.push({
              node: node,
              name: name + ' have not same name as filename ' + filename + ' !',
              gravityLevel: 2,
              gravity: 'hot'
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