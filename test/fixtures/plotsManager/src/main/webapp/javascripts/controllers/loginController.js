app.controller('loginController', ['$scope', 'Network', '$location', function($scope, network, $location) {

    $scope.clickOnNewUser = function() {
        /*confirmation mot de passe*/
        if($scope.passwordCreate===$scope.passwordCreateConfirm)
        {
            //en cas de succes du callback: On redirige vers la page de visualisation apres avoir cree l'user
            network.addUser(function() {
                console.log("path vers /view");
                $location.path('/view');
            }, function(data, status, headers, config) {
                $scope.errorMessage = status.toString();
                console.log(data, status, headers, config);
            }, $scope.loginCreate, $scope.passwordCreate);
        } else {
            $scope.errorMessage = "mots de passes différents";
        }

    };

    $scope.clickOnLogin = function() {
        console.log($scope.login+" " +$scope.password);
        network.login(function(user) {
             console.log(user);
            if (user.userId === undefined) {
                $scope.login = "";
                $scope.password= "";
                $scope.errorMessage = "Login ou mot de passe incorrect";
            } else {
                console.log("path vers /view");
                $location.path('/view');
            }
        }, function(data, status, headers, config) {
            $scope.errorMessage = status.toString();
            console.log(data, status, headers, config);
        }, $scope.login, $scope.password);
    };

}]);
