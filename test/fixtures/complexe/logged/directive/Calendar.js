angular.module('publicApp').directive('calendar', [
  'CalendarService',
  function(calendarService) {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      template: [
        '<div class="calendarContainer">',
        '<div class="calendarControls">',
        '<a class="calendarControlsPrev" ng-click="prev()"><<</a>',
        '<span class="calendarControlsTitle">{{title}}</span>',
        '<a class="calendarControlsNext" ng-click="next()">>></a>',
        '<a class="calendarControlsWeek" ng-click="changeViewType(\'week\')">Week</a>',
        '<a class="calendarControlsMonth" ng-click="changeViewType(\'month\')">Month</a>',
        '</div>',
        '<div class="calendarColumn" ng-repeat="column in columns">',

        '<div class="calendarHeaderColumn">',
        '{{column.header}}',
        '</div>',

        '<div class="calendarLine ',
        'isSameMonth-{{line.isSameMonth}} isToday-{{line.isToday}} isSelected-{{line.isSelected}}',
        '" drop drop-callback="eventDrop" drop-data="line" ng-repeat="line in column.lines" ng-click="clickOnLine(line)">',
        '{{line.title}}',
        '<div class="calendarContainerEvent">',
        '<div class="calendarEvent" drag drag-data="event" ng-click="clickOnEvent(event, $event)" ng-style="event.style" ng-repeat="event in line.events | limitTo:3">',
        '{{event.title}}',
        '</div>',
        '</div>',
        '</div>',

        '</div>',
        '</div>'
      ].join(''),
      link: function($scope, element, attrs) {
        
        var viewType = attrs.type || calendarService.TYPE.month;
        var firstDayOfWeek = attrs.firstDayOfWeek || 0;
        firstDayOfWeek = parseInt(firstDayOfWeek, 10);

        var current = moment(new Date());

        var refreshCalendarCallback = $scope.$parent[attrs['refreshCalendar'].split('(')[0]];
        if(refreshCalendarCallback) {
          refreshCalendarCallback(function() {
            draw();
          });
        }

        var getEventsCallback = $scope.$parent[attrs['getEvents'].split('(')[0]];
        var selectDateCallback = $scope.$parent[attrs['selectDate'].split('(')[0]];
        var selectEventCallback = $scope.$parent[attrs['selectEvent'].split('(')[0]];

        var draw = function draw() {
          element[0].classList.remove('month');
          element[0].classList.remove('week');
          element[0].classList.add(viewType);
          $scope.title = calendarService.buildTitle(viewType, current);
          $scope.columns = calendarService.buildCalendar(viewType, current, firstDayOfWeek, getEventsCallback);
        };

        draw();

        $scope.prev = function() {
          current = current.subtract(viewType, 1);
          draw();
        };

        $scope.next = function() {
          current = current.add(viewType, 1);
          draw();
        };

        var lastSelectedLine;

        $scope.clickOnLine = function(line) {
          if(line === lastSelectedLine && selectDateCallback) {
            selectDateCallback(line.moment.toDate());
          } else {
            if(lastSelectedLine) {
              lastSelectedLine.isSelected = false;
            }
            line.isSelected = true;
            lastSelectedLine = line;
          }
        };

        $scope.clickOnEvent = function(event, $event) {
          if(event.type === 'moreEvent') {
            current = event.date.clone();
            $scope.changeViewType('week');
          } else if(selectEventCallback) {
            $event.stopPropagation();
            selectEventCallback(event);
          }
        };

        $scope.changeViewType = function(type) {
          viewType = type;
          draw();
        };

        $scope.eventDrop = function(event, line) {
          var index = _.find(event.line.events, function(e) {
            return e === event;
          });
          event.line.events.splice(index, 1);
          line.events = line.events || [];
          event.line = line;
          var old = moment(new Date(event.date));
          event.date = line.moment.clone();
          if(line.type === 'month') {
            event.date.hour(old.hour()).minute(old.minute());
          }
          event.date = event.date.toDate();
          line.events.push(event);
          if(selectEventCallback) {
            selectEventCallback(event);
          }
          $scope.$apply();
        };

      }
    };
  
  }

]);