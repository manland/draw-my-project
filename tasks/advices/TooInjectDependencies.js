var advices;

module.exports = {
  start: function(nodes) {
    advices = [];
  },
  visit: function(node, options) {
    var nbMax = options.advices.tooInjectDependencies.options.nbMax;
    if(node.imports.length > nbMax) {
      var names = node.name.split(options.pathSeparator);
      var name = names[names.length - 1].split('.')[0];
      var sentence = name + ' has ' + node.imports.length + ' dependencies, it must have ' + nbMax + ' at most.';
      advices.push({
        node: node,
        name: sentence
      });
    }
  },
  end: function(nodes) {
    return advices;
  }
};