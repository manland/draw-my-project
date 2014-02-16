angular.module('app').service('NotUsedService', [
  function() {

    var potentialNotUsedNodes;

    return {
      start: function(nodes) {
        potentialNotUsedNodes = [];
      },
      visit: function(node) {
        if(node.imports.length === 0) {
          potentialNotUsedNodes.push(node);
        }
      },
      end: function(nodes) {
        _.each(nodes, function(node) {
          potentialNotUsedNodes = _.reject(potentialNotUsedNodes, function(potentialNode) {
            return undefined !== _.find(node.imports, function(nodeName) {
              return potentialNode.name === nodeName;
            });
          });
        });
        return _.map(potentialNotUsedNodes, function(node) {
          return {
            node: node,
            name: node.name + ' is never used !',
            gravityLevel: 2,
            gravity: 'hot'
          };
        });
      }
    };
  }
]);