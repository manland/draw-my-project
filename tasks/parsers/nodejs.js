var _ = require('underscore');
var parsersHelper = require('../lib/parsersHelper');

var regexImports = /require\(['|"](.+)['|"]\)/;

var foundName = function foundName(nodeName, filepath, isImport) {
  
  //lib like `mongoose`
  if(nodeName.charAt(0) !== '.' && isImport === true) {
    return nodeName;
  }

  var path = filepath.split('/');
  path = _.initial(path);
  var names = nodeName.split('/');
  var newNames = _.map(names, function(n) {
    if(n === '..') {
      path = _.initial(path);
      return '';
    } else if(n === '.') {
      return '';
    } else {
      return n;
    }
  });
  return path.join('/') + '/' + _.filter(newNames, function(n) {
    return n !== '';
  }).join('/');
};

var foundImports = function foundImports(regexImports, nodes, src, filepath, options) {
  var temp = src;
  var matches = temp.match(regexImports);
  var count = 0;
  var imports = [];
  while(matches !== null) {
    var name = foundName(matches[1], filepath, true);//.split('/');
    //name = name[name.length-1];
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
    name = foundName(name, filepath);
    var nodeType = 'nodejs';
    imports = foundImports(regexImports, nodes, src, filepath, options);
    nodes[name] = parsersHelper.buildNode(name, filepath, src.length, imports, nodeType);
    return nodes;
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}