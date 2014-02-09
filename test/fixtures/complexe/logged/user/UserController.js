angular.module('publicApp').controller('UserController', [
  '$scope', '$timeout', 'UserService',
  function($scope, $timeout, userService) {

    var lastModifiedId;

    var init = function init() {
      $scope.showAddSection = false;
      $scope.addUserLogin = '';
      $scope.addUserPassword = '';
      lastModifiedId = undefined;
    };

    $scope.add = function() {
      if(!lastModifiedId) {
        userService.add($scope.addUserLogin, $scope.addUserPassword);
      } else {
        userService.modify(lastModifiedId, $scope.addUserLogin, $scope.addUserPassword);
        lastModifiedId = undefined;
      }
    };

    $scope.modify = function(user) {
      $scope.addUserLogin = user.login;
      $scope.addUserPassword = user.password;
      $scope.showAddSection = true;
      lastModifiedId = user._id;
    };

    $scope.delete = function(id) {
      userService.delete(id);
    };

    $scope.deleteAll = function() {
      userService.deleteAll();
    };

    /**
     *  RELATION WITH SERVICE
     */

    userService.addListener({
      all: function(users) {
        $timeout(function() {
          $scope.users = users;
          init();
        });
      },
      add: function(user) {
        $timeout(function() {
          $scope.users.push(user);
          init();
        });
      },

    });

    userService.getAll();

  }
]);