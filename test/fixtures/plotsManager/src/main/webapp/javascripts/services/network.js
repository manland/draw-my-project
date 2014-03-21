app.factory("Network", ["$http", "$location",
function ($http, $location) {

    var isLoginMocked = true;
    var userMock;
    var user;

    function login(callback, errorCallback, login, password) {
        if (isLoginMocked === true) {
            if ((login === "aaa") && (password === "aaa")) {
                userMock = {"userId":1,"login":"aaa","password":"aaa", "farm": [{"farmId":1,"name":"La ferme","plots":[{"plotId":1,"name":"Ma belle parcelle","area":33.5,"longitude":47.63,"latitude":2.22},{"plotId":2,"name":"Ma pas belle parcelle","area":37.5,"longitude":42.68,"latitude":1.22}]}]}; 
                callback(userMock);
            } else {
                callback({});
            }
        } else {
            $http.post("rest/login",{login:login, password:password})
            .success(function(data){
                user = data;
                callback(data);
            })
            .error(errorCallback);
        } 
    }

    function addUser(callback, errorCallback, log, pass){
        console.log("addUser");
        if (isLoginMocked === true) {
            userMock = {"userId":10,"login":log,"password":pass, "farm": [{"farmId":10,"name":"noName","plots":[] }]}; 
            callback();
        } else {
            $http.post("rest/addUser",{login:log, password:pass})
            .success(callback)
            .error(errorCallback);
        }
    }

    function getUser(callback){
        if (isLoginMocked) {
            callback(userMock);
        } else {
            callback(user);
        }
    }

    function changeUser(callback, errorCallback, user){
        console.log("changeUser");
        if (isLoginMocked === true) {
            userMock = user ; //On recoit le nouvel user en entier
            callback(userMock);
        } else {
            
            $http.post("rest/modif",user) //Envoi du nouvel user au serveur
            .success(callback)
            .error(errorCallback);
        }
    }

    function createPlot(callback, errorCallback, user){
        console.log("createPlot");
        if (isLoginMocked === true) {
            userMock = user ; //On recoit le nouvel user en entier
            callback(userMock);
        } else {
            var localUser = angular.copy(user);
            var plotToAdd = user.farm[0].plots[user.farm[0].plots.length - 1];
            plotToAdd.farmId = user.farm[0].farmId;
            localUser.farm[0].plots = [plotToAdd];
            $http.post("rest/add",localUser) //Envoi du nouvel user au serveur
            .success(callback)
            .error(errorCallback);
        }
    }

    function deletePlot(callback, errorCallback, plotId, login, password){
        console.log("deletePlot");
        if (isLoginMocked === true) {
            userMock = user ; //On recoit le nouvel user en entier
            callback(userMock);
        } else {
            $http.post("rest/delete/" + plotId, {login:login, password:password}) //Envoi du nouvel user au serveur
            .success(callback)
            .error(errorCallback);
        }
    }

    return {
        login: function(callback, errorCallback, log, pass) {
        console.log("login");
        login(callback, errorCallback, log, pass);
        },

        addUser: function(callback, errorCallback, log, pass) {
            addUser(callback, errorCallback, log, pass);
        },

        getUser: function(callback) {
            getUser(callback);
        },

        //Ils font la meme chose car on envoie tout l'utilisateur au serveur chaque fois (plus facile a lire)
        changeFarmName: function(callback, errorCallback, user) {
            changeUser(callback, errorCallback, user);
        },

        changePlot: function(callback, errorCallback, user) {
            changeUser(callback, errorCallback, user);
        },

        createPlot: function(callback, errorCallback, user) {
            createPlot(callback, errorCallback, user);
        },      
        
        deletePlot: function(callback, errorCallback, plotId, login, password) {
            deletePlot(callback, errorCallback, plotId, login, password);
        }
    };

}]);
