angular.module('app').service('AdviceViewService', [
  'DataService', 'ChartService', 'RootScopeService', 
  'SizeControllerTooImportantService', 'ControllerImportsService', 
  'NotUsedService', 'FileClassNameService', 'TooInjectDependenciesServices',
  function(dataService, chartService, rootScopeService, 
    sizeControllerTooImportantService, controllerImportsService, 
    notUsedService, fileClassNameService, tooInjectDependenciesServices) {

    var advicesServices = [
      rootScopeService, 
      sizeControllerTooImportantService,
      controllerImportsService, 
      notUsedService, 
      tooInjectDependenciesServices,
      fileClassNameService
    ];
    var advices;

    return {
      getAdvices: function() {
        if(advices === undefined) {
          var data = dataService.getData();
          _.each(advicesServices, function(service) {
            service.start(data);
          });
          _.each(data, function(d) {
            _.each(advicesServices, function(service) {
              service.visit(d);
            });
          });
          advices = [];
          _.each(advicesServices, function(service) {
            advices = _.union(advices, service.end(data));
          });
          advices = advices.sort(function(a1, a2) {
            return a2.gravityLevel - a1.gravityLevel;
          });
        }
        return advices;
      },
      mouseOver: function(nodeName) {
        chartService.mouseOver(nodeName);
      },
      mouseOut: function(nodeName) {
        chartService.mouseOut(nodeName);
      }
    };
  }
]);