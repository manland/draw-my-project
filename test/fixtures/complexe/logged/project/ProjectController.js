angular.module('publicApp').controller('ProjectController', [
  '$scope', '$timeout', 'ProjectService',
  function($scope, $timeout, projectService) {

    var lastModifiedId;

    var init = function init() {
      $scope.showAddSection = false;
      $scope.addProjectName = '';
      lastModifiedId = undefined;
    };

    $scope.add = function() {
      if(!lastModifiedId) {
        projectService.add($scope.addProjectName);
      } else {
        projectService.modify(lastModifiedId, $scope.addProjectName);
        lastModifiedId = undefined;
      }
    };

    $scope.modify = function(project) {
      $scope.addProjectName = project.name;
      $scope.showAddSection = true;
      lastModifiedId = project._id;
    };

    $scope.delete = function(id) {
      projectService.delete(id);
    };

    $scope.deleteAll = function() {
      projectService.deleteAll();
    };

    /**
     *  RELATION WITH SERVICE
     */

    projectService.addListener({
      all: function(projects) {
        $timeout(function() {
          $scope.projects = projects;
          init();
        });
      },
      add: function(project) {
        $timeout(function() {
          $scope.projects.push(project);
          init();
        });
      },

    });

    projectService.getAll();

  }
]);