var parsersHelper = require('../lib/parsersHelper');

var regexImports = /require\(['|"](.+)['|"]\)/;

var foundImports = function foundImports(regexImports, nodes, src, options) {
  var temp = src;
  var matches = temp.match(regexImports);
  var count = 0;
  var imports = [];
  while(matches !== null) {
    var name = matches[1];
    name = name.replace('./', '');
    imports.push(name);
    
    if(nodes[name] === undefined) {
      nodes[name] = parsersHelper.buildNode(name);
    }
    count = count + 1;//kill infinite recursion
    if(count < 1000) {
      temp = temp.substr(matches.index + matches[0].length);
      matches = temp.match(regexImports);
    } else {
      matches = null;
    }
  }

  return imports;
};

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    var name = filepath.split('/');
    name = name[name.length-1].split('.')[0];
    var nodeType = 'nodejs';
    imports = foundImports(regexImports, nodes, src, options);
    nodes[name] = parsersHelper.buildNode(name, filepath, src.length, imports, nodeType);
    return nodes;
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}