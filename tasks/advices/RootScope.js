var advices;

module.exports = {
  start: function(nodes) {
    advices = [];
  },
  visit: function(node) {
    if(node.name.indexOf('$rootScope') > -1) {
      advices.push({
        node: node,
        name: 'Are you sur you want to use $rootScope ?'
      });
    }
  },
  end: function(nodes) {
    return advices;
  }
};