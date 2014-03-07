var advices;

var endsWith = function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

module.exports = {
  start: function(nodes) {
    advices = [];
  },
  visit: function(node, options) {
    var prefix = options.advices.filenameChecker.options.prefix;
    if(prefix !== undefined && 
      prefix[node.type] !== undefined && 
      node.name.indexOf(prefix[node.type]) !== 0) {
      advices.push({
        node: node,
        name: node.name + ' must start by ' + prefix[node.type] + '.'
      });
    }
    var suffix = options.advices.filenameChecker.options.suffix;
    if(suffix[node.type] !== undefined && endsWith(node.name, suffix[node.type]) === false) {
      advices.push({
        node: node,
        name: node.name + ' must end by ' + suffix[node.type] + '.'
      });
    }
  },
  end: function(nodes) {
    return advices;
  }
};