var _ = require('underscore');
var parsersHelper = require('../lib/ParsersHelper');

var regexPackage = /package\s(.*?);/;
var regexName = /public\sclass\s(.*?)\s/;
var regexType = /@(Controller|Service|Aspect|RestController|Configuration)/;
var regexImports = /import\s(.*?);/;

var foundName = function foundName(nodeName, src, isImport, options) {
  
  if(isImport === true) {
    return nodeName.split('.').join('/');
  }

  var res;
  var matches = src.match(regexPackage);
  if(matches !== null) {
    res = matches[1];
    matches = src.match(regexName);
    if(matches !== null) {
      res = res + '.' + matches[1];
    }
  }
  if(res !== undefined) {
    res = res.replace(/\./g, '/');
  }
  return res;
};

var foundImports = function foundImports(regexImports, nodes, src, options) {
  var temp = src;
  var matches = temp.match(regexImports);
  var count = 0;
  var imports = [];
  while(matches !== null) {
    var name = foundName(matches[1], src, true, options);//.split('/');
    //name = name[name.length-1];
    imports.push(name);
    
    if(nodes[name] === undefined) {
      nodes[name] = parsersHelper.buildNode(name, options);
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
    name = foundName(name, src, false, options);
    var nodeType = 'java';
    var matches = src.match(regexType);
    if(matches !== null) {
      nodeType = matches[1].toLowerCase();
    }
    imports = foundImports(regexImports, nodes, src, options);
    nodes[name] = parsersHelper.buildNode(name, options, filepath, src.length, imports, nodeType, src);
    return nodes;
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}