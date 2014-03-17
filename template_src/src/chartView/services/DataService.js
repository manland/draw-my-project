angular.module('app').service('DataService', [
  'ConstantsService',
  function(constantsService) {

    var data = constantsService.getData();
    var hierarchicalData;

    var buildHierarchicalData = function buildHierarchicalData() {
      var res = {
        name: '',
        children: []
      };
      data.forEach(function(node) {
        var packages = node.name.split(constantsService.getPathSeparator());
        var lastPackage, find;
        packages.forEach(function(p) {
          if(lastPackage === undefined) {
            lastPackage = _.extend({children: []}, node);
            lastPackage.name = p;
            find = _.find(res.children, function(child) {
              return child.name === p;
            });
            if(find === undefined) {
              res.children.push(lastPackage);
            } else {
              lastPackage = find;
            }
          } else {
            find = _.find(lastPackage.children, function(child) {
              return child.name === p;
            });
            if(find === undefined) {
              var t = _.extend({children: []}, node);
              t.name = p;
              lastPackage.children.push(t);
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