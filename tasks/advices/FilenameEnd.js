var advices;

var endsWith = function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

module.exports = {
  start: function(nodes) {
    advices = [];
  },
  visit: function(node, options) {
    var suffix = options.advices.filenameEnd.options.suffix;
    if(suffix[node.type] !== undefined && endsWith(node.name, suffix[node.type]) === false) {
      advices.push({
        node: node,
        name: node.name + ' does not end with ' + suffix[node.type] + '.',
        gravityLevel: 2,
        gravity: 'hot'
      });
    }
  },
  end: function(nodes) {
    return advices;
  }
};