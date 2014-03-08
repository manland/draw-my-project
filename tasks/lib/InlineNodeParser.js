var _ = require('underscore');

module.exports = {

  parse: function parse(regexp, buildNodeFunc, nodes, src, filepath, options) {
    var temp = src.split('\n').join(' ');
    var matches = temp.match(regexp);
    var count = 0;
    while(matches !== null) {
      var nodeType = matches[1];
      var name = matches[2];

      var importsString = [];
      if(matches[3] !== undefined) {
        importsString = matches[3].replace(/(\[|\]|\s|'|")/g, '').split(',');
      }
      var importsFunc = [];
      if(matches[4] !== undefined) {
        importsFunc = matches[4].replace(/\s/g, '').split(',');
      }

      var imports = importsString.length >= importsFunc.length ? importsString : importsFunc;
      imports = _.filter(imports, function(imp) {
        return imp !== '';
      });
      _.each(imports, function(imp) {
        if(nodes[imp] === undefined) {
          nodes[imp] = buildNodeFunc(imp);
        }
      });

      if(nodes[name] === undefined) {
        nodes[name] = buildNodeFunc(name, filepath, src.length, imports, nodeType);
      } else {
        nodes[name].filepath = filepath;
        nodes[name].size = src.length;
        nodes[name].imports = imports;
        nodes[name].type = nodeType;
      }

      count = count + 1;
      if(options.nbNodeByFile === -1 || count < options.nbNodeByFile) {
        temp = temp.substr(matches.index + matches[0].length);
        matches = temp.match(regexp);
      } else {
        matches = null;
      }
    }

    return nodes;
  }

};