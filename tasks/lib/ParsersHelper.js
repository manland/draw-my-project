var _ = require('underscore');

module.exports = {

	buildNode: function buildNode(name, options, optFilepath, optSize, optImports, optType, optSrc) {
    var filepath = optFilepath || '';
    var size = optSize || 1;
    var imports = optImports || [];
    var type = optType || '';
    var src = '';
    if(optSrc !== undefined && 
        options.source !== false && 
        options.source.srcInCode === false) {
      src = 'src/' + filepath;
    } else if(optSrc !== undefined && 
        options.source !== false && 
        options.source.srcInCode === true) {
      src = optSrc;
    }
    var res = {
      name: name,
      filepath: filepath,
      size: size,
      imports: imports,
      type: type
    };
    if(src !== '') {
      res.src = src;
    }
    return res;
  },
  updateNode: function updateNode(originalNode, options, optFilepath, optSize, optImports, optType, optSrc) {
    var filepath = originalNode.filepath || optFilepath || '';
    var size = originalNode.size || optSize || 1;
    var type = originalNode.type || optType || '';
    var imports = originalNode.imports || [];
    imports = _.union(imports, optImports);
    var src = originalNode.src || '';
    if(optSrc !== undefined && 
        options.source !== false && 
        options.source.srcInCode === false) {
      src = 'src/' + filepath;
    } else if(optSrc !== undefined && 
        options.source !== false && 
        options.source.srcInCode === true) {
      src = optSrc;
    }
    var res = {
      name: originalNode.name,
      filepath: filepath,
      size: size,
      imports: imports,
      type: type
    };
    if(src !== '') {
      res.src = src;
    }
    return res;
  }
  
}