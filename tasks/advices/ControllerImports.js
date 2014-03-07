var advices;

module.exports = {
  start: function(nodes) {
    advices = [];
  },
  visit: function(node) {
    if(node.type === 'controller' && node.imports.length > 2) {
      advices.push({
        node: node,
        name: 'A controller must import $scope and its service !'
      });
    }
  },
  end: function(nodes) {
    return advices;
  }
};