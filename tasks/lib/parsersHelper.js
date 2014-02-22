var buildNode = function buildNode(name, optFilepath, optSize, optImports, optType) {
  var filepath = optFilepath || '';
  var size = optSize || 1;
  var imports = optImports || [];
  var type = optType || '';
  if(name.charAt(0) === '$' && type === '') {
    type = 'angular';
  }
  return {
    name: name,
    filepath: filepath,
    size: size,
    imports: imports,
    type: type
  };
};

var foundImports = function foundImports(regexImports, nodes, src, options) {
  var imports = [];

  var temp = src;
  var matches = temp.match(regexImports);

  if(matches !== null && matches !== undefined) {
    temp = temp.substr(0, matches.index);
    var importsTemp = temp.split(',');
    for(var i=0, len=importsTemp.length; i<len; i++) {
      var name = importsTemp[i].replace(/[^a-zA-Z0-9$\/]+/g, '');
      if(name !== '') {
        if(nodes[name] === undefined) {
          nodes[name] = buildNode(name);
        }
        imports.push(name);
      }
    }
  }

  return imports;
};

var foundNode = function foundNode(regexClassName, regexImports, nodes, src, filepath, options) {
  var temp = src;
  var matches = temp.match(regexClassName);
  var count = 0;
  while(matches !== null) {
    var nodeType = matches[1];
    var name = matches[2];
    var firstCrochet = temp.indexOf('[', matches.index);
    var firstFunction = temp.indexOf('function', matches.index);
    var imports = [];
    temp = temp.substr(firstCrochet);
    if(firstCrochet < firstFunction) {
      imports = foundImports(regexImports, nodes, temp, options);
    }
    if(nodes[name] === undefined) {
      nodes[name] = buildNode(name, filepath, src.length, imports, nodeType);
    } else {
      nodes[name].filepath = filepath;
      nodes[name].size = src.length;
      nodes[name].imports = imports;
      nodes[name].type = nodeType;
    }
    count = count + 1;
    if(options.nbNodeByFile === -1 || count < options.nbNodeByFile) {
      matches = temp.match(regexClassName);
    } else {
      matches = null;
    }
  }

  return nodes;
};

module.exports = {
	buildNode: buildNode,
	foundImports: foundImports,
	foundNode: foundNode
}