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
    var size = options.advices.sizeControllerTooImportant.options.sizeMaxCtrlComparedToService;
    if(options.type === 'angularjs' && 
       sizeByType['controller'] > (sizeByType['factory'] * size)) {
      advices.push({
        node: undefined,
        name: 'Your controllers are too important compared to services !'
      });
    }
    return advices;
  }
};