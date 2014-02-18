angular.module('app').service('DataService', [
  'ConstantsService',
  function(constantsService) {

    var data = constantsService.getData();
    var hierarchicalData;

    var buildHierarchicalData = function buildHierarchicalData() {
      var res = {
        name: 'rootNode',
        children: []
      };
      data.forEach(function(node) {
        var packages = node.name.split(constantsService.getPathSeparator());
        var lastPackage, find;
        packages.forEach(function(p) {
          if(lastPackage === undefined) {
            lastPackage = {
              name: p,
              children: [],
              type: node.type,
              size: node.size
            };
            find = undefined;
            res.children.forEach(function(child) {
              if(child.name === p) {
                find = child;
              }
            });
            if(find === undefined) {
              res.children.push(lastPackage);
            } else {
              lastPackage = find;
            }
          } else {
            find = undefined;
            lastPackage.children.forEach(function(child) {
              if(child.name === p) {
                find = child;
              }
            });
            if(find === undefined) {
              lastPackage.children.push({
                name: p,
                children: [],
                type: node.type,
                size: node.size
              });
            } else {
              lastPackage = find;
            }
          }
        });
      });
      return res;
    };

    return {
      getData: function() {
        return data;        
      },
      getHierarchicalData: function() {
        if(hierarchicalData === undefined) {
          hierarchicalData = buildHierarchicalData();
        }
        return hierarchicalData;
      }
    };

  }
]);