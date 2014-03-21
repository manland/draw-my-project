app.controller('ppeController', ['$scope', 'Network', '$location', function($scope, network, $location) {

    // Pouvoir accéder aux information de l'utilisateur(ferme, plots)
    network.getUser(function(user) {
        $scope.user = user;
    });

    //technique 1:On injecte le nouveau nom entré par l'utilisateur (via le scope) et on envoie l'user modifié au service
    $scope.changeFarmName = function() {

        network.changeFarmName(function(user) {
            $scope.user.farm[0].name = $scope.newFarmName; //callback de la fonction changeFarmName (nouveau nom de ferme ) = ce qui sera fait
            $location.path('/view');
        }, function(data, status, headers, config) {
            $scope.errorMessage = status.toString();
            console.log(data, status, headers, config);
        }, $scope.user); //user avec le nouveau nom de ferme, il est envoye au serveur pour aller dans le post
    };

    //technique 2:Rien à faire grace audatd binding
    $scope.clickOnChangePlot= function clickOnChangePlot(plot) {
        var localUser = angular.copy($scope.user);
        var plotToModify = plot;
        localUser.farm[0].plots = [plotToModify];
        
        network.changePlot(function(user) {

            /*Rien à faire par magie du 2 way binding*/

        }, function(data, status, headers, config) {
            $scope.errorMessage = status.toString();
            console.log(data, status, headers, config);
        }, localUser); 
    };

    $scope.backToVisualize = function() {
        $location.path('/view');
    };

    $scope.createPlot = function(user){
        var newPlot = {
                name : $scope.newPlotName,
                latitude : $scope.newPlotLat,
                longitude : $scope.newPlotLon,
                area : $scope.newPlotArea                
        };
        $scope.user.farm[0].plots.push(newPlot);

        network.createPlot(function(user) {
            $scope.newPlotName="";
            $scope.newPlotLat="";
            $scope.newPlotLon="";
            $scope.newPlotArea="";

            //a faire
        }, function(data, status, headers, config) {
            $scope.errorMessage = status.toString();
            console.log(data, status, headers, config);
        }, $scope.user); //user avec le nouveau nom de ferme, il est envoye au serveur pour aller dans le post
    };
    
    //delete part
    $scope.deletePlot = function deletePlot(plot) {
        
        network.deletePlot(function(user) {

            /*Rien à faire par magie du 2 way binding*/

        }, function(data, status, headers, config) {
            $scope.errorMessage = status.toString();
            console.log(data, status, headers, config);
        }, plot.plotId, $scope.user.login, $scope.user.password); 
    };
}]);
