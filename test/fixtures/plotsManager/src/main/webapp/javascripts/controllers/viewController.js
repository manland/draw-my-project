app.controller('viewController', ['$scope', 'Network', '$location', function($scope, network, $location) {

    // Pouvoir accéder aux information de l'utilisateur(ferme, plots)
    network.getUser(function(user) {
        $scope.user = user;
    });

    $scope.clickOnChangeInformation = function() {
         console.log("path vers /ppe");
         $location.path('/ppe');

    };

}]);
