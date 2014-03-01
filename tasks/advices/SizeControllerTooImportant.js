var advices, sizeByType;

module.exports = {
  start: function(nodes) {
    advices = [];
    sizeByType = {};
  },
  visit: function(node) {
    sizeByType[node.type] = sizeByType[node.type] || 0;
    sizeByType[node.type] = sizeByType[node.type] + node.size;
  },
  end: function(nodes, options) {
    if(options.type === 'angularjs' && 
       sizeByType['controller'] > (sizeByType['factory'] * 0.2)) {
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