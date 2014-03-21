app.controller('toolboxController', ['$scope', '$location', function($scope, $location) {


    $scope.actionClicAngular = function() {
         window.alert("vous avez entré: '"+$scope.variableDansMonControleur+"' comme iput");
    };

    $scope.actionClicAngular2 = function() {
         $location.path('JE_SUIS_ICI_ET_PLUS_LA_BAS');
    };    

}]);
