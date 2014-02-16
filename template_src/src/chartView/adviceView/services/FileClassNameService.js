angular.module('app').service('FileClassNameService', [
  function() {

    var advices;

    return {
      start: function(nodes) {
        advices = [];
      },
      visit: function(node) {
        //TODO : get filename and set if different class
      },
      end: function(nodes) {
        return advices;
      }
    };
  }
]);