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
  end: function(nodes, options) {
    var myOptions = options.advices.notUsed.options;

    _.each(nodes, function(node) {
      potentialNotUsedNodes = _.reject(potentialNotUsedNodes, function(potentialNode) {
        return undefined !== _.find(node.imports, function(nodeName) {
          return potentialNode.name === nodeName;
        });
      });
    });

    if(myOptions.desableNodeType.length > 0) {
      potentialNotUsedNodes = _.reject(potentialNotUsedNodes, function(potentialNode) {
        return _.contains(myOptions.desableNodeType, potentialNode.type);
      });
    }

    return _.map(potentialNotUsedNodes, function(node) {
      return {
        node: node,
        name: node.name + ' is never used !'
      };
    });
  }
};