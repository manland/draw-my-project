angular.module('publicApp').controller('TaskController', [
  '$scope', '$timeout', 'TaskService',
  function($scope, $timeout, taskService) {

    var lastModifiedId;
    var refreshCalendarFunction;

    var init = function init() {
      $scope.showAddSection = false;
      $scope.addTaskDurationHour = '';
      $scope.addTaskDurationMinute = '';
      $scope.addTaskDate = '';
      $scope.addTaskTimeHour = '';
      $scope.addTaskTimeMinute = '';
      $scope.addTaskProject = undefined;
      lastModifiedId = undefined;
    };

    $scope.refreshCalendarCallback = function(callback) {
      refreshCalendarFunction = callback;
    };

    $scope.add = function() {
      var hour = parseInt($scope.addTaskDurationHour, 10);
      var minute = parseInt($scope.addTaskDurationMinute, 10);
      var duration = (hour * 60) + minute;
      var date = moment($scope.addTaskDate, 'D-MMMM-YYYY');
      date.hours($scope.addTaskTimeHour);
      date.minutes($scope.addTaskTimeMinute);
      date = date.toDate();
      if(!lastModifiedId) {
        taskService.add(duration, $scope.addTaskProject._id, date);
      } else {
        taskService.modify(lastModifiedId, duration, $scope.addTaskProject._id, date);
        lastModifiedId = undefined;
      }
    };

    $scope.setTaskDate = function(date) {
      init();
      $scope.showDatePicker = false;
      $scope.addTaskDate = moment(new Date(date)).format('D-MMMM-YYYY');
      $scope.showAddSection = true;
    };

    $scope.modify = function(task) {
      init();
      $scope.addTaskDurationHour = Math.floor(task.duration / 60);
      $scope.addTaskDurationMinute = task.duration % 60;
      $scope.addTaskDate = moment(new Date(task.date)).format('D-MMMM-YYYY');
      $scope.addTaskTimeHour = new Date(task.date).getHours();
      $scope.addTaskTimeMinute = new Date(task.date).getMinutes();
      if($scope.projects) {
        for(var i=0, length=$scope.projects.length; i<length && !$scope.addTaskProject; i++) {
          if($scope.projects[i]._id === task.project._id) {
            $scope.addTaskProject = $scope.projects[i];
          }
        }
      }
      $scope.showAddSection = true;
      lastModifiedId = task._id;
    };

    $scope.delete = function(id) {
      taskService.delete(id);
    };

    $scope.deleteAll = function() {
      taskService.deleteAll();
    };

    $scope.add1000Tasks = function() {
      var duration = 1;
      var promises = [];
      for(var i=0; i<1000; i++) {
        duration = duration + 1;
        promises.push($http.get('/rest/v1/task/add?duration='+duration+'&user=529c9b310bdff00816000001&project=52a3527e4defe78a1e000001'));
      }

      var p = $q.all(promises);
      p.then(function(data) {
        dataCacheService.invalid('task');
        refresh();
      },
      function(error) {
        console.error(error);
      });
    };

    $scope.eventsFromServer = function(startDate, endDate, callback) {
      taskService.tasksForDates(startDate, endDate, function(tasks) {
        callback(tasks.map(function(task) {
          return {
            date: task.date, 
            title: task.project.name || 'noname',
            duration: task.duration,
            project: task.project
          };
        }));
      });
      //callback([{date: startDate, title: 'OK'}]);
    };

    /**
     *  RELATION WITH SERVICE
     */

    taskService.addListener({
      all: function(tasks) {
        $timeout(function() {
          init();
          if(refreshCalendarFunction) {
            refreshCalendarFunction();
          }
        });
      },
      add: function(task) {
        $timeout(function() {
          init();
          if(refreshCalendarFunction) {
            refreshCalendarFunction();
          }
        });
      },
      projects: function(projects) {
        $timeout(function() {
          $scope.projects = projects;
        });
      }
    });

    taskService.getAllProjects();

  }
]);