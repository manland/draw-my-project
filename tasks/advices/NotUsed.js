var _ = require('underscore');

var potentialNotUsedNodes;

module.exports = {
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
      var gravityLevel = 2;
      if(node.type === 'directive' || node.type === 'filter') {
        gravityLevel = 0;
      }
      return {
        node: node,
        name: node.name + ' is never used !',
        gravityLevel: gravityLevel,
        gravity: gravityLevel === 2 ? 'hot' : 'notserious'
      };
    });
  }
};