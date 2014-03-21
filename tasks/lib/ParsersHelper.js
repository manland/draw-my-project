var fileWriteHelper = require('./FileWriteHelper');

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
  }
  
}