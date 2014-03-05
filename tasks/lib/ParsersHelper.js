module.exports = {

	buildNode: function buildNode(name, optFilepath, optSize, optImports, optType) {
    var filepath = optFilepath || '';
    var size = optSize || 1;
    var imports = optImports || [];
    var type = optType || '';
    return {
      name: name,
      filepath: filepath,
      size: size,
      imports: imports,
      type: type
    };
  }
  
}