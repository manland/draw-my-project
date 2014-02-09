angular.module('publicApp').factory('MonthService', [function() {

  return {
    template: [
      '<div class="date-picker-global-container">',
      '<div class="date-picker-controls-header">',
      '<a class="date-picker-prev" ng-click="prevMonth()"><<</a>',
      '<span class="date-picker-current-month">{{month}}</span>',
      '<a class="date-picker-next" ng-click="nextMonth()">>></a>',
      '</div>',
      '<div class="date-picker-day-header">',
      '<div class="date-picker-day" ng-repeat="dayName in dayNames">{{dayName}}</div>',
      '</div>',
      '<div class="date-picker-month">',
      '<div class="date-picker-week" ng-repeat="week in calendar">',
      '<div class="date-picker-day ',
      'isSameMonth-{{day.isSameMonth}} isToday-{{day.isToday}} isSelected-{{day.isSelected}}"', 
      'ng-repeat="day in week"',
      'ng-click="selectDate(day)">',
      '{{day.dayOfWeek}}',
      '<div ng-repeat="event in day.events">{{event.title}}</div>',
      '</div>',
      '</div>',
      '</div>',
      '</div>'
    ].join(''),
    link: function($scope, element, attrs) {
      var firstDate = moment(new Date());
      var today = moment(new Date());
      var defaultSelectedDate;
      var watches = [];
      var events = [];
      var getEventsFunction;

      if(attrs['defaultSelectedDate']) {//selected date by default
        watches.push($scope.$parent.$watch(attrs['defaultSelectedDate'], function(newValue, oldValue) {
          if(newValue) {
            defaultSelectedDate = moment($scope.$parent[attrs['defaultSelectedDate']]);
            firstDate = defaultSelectedDate.clone();
            if(defaultSelectedDate.isValid()) {
              updateMonth(firstDate);
              buildCalendar(firstDate);
            }
          }
        }));
      }

      if(attrs['events']) {
        watches.push($scope.$parent.$watch(attrs['events'], function(newValue, oldValue) {
          if(newValue) {
            events = $scope.$parent[attrs['events']];
            drawEvents();
          }
        }));
      }

      if(attrs['getEvents']) {
        watches.push($scope.$parent.$watch(attrs['getEvents'], function(newValue, oldValue) {
          if(newValue) {
            getEventsFunction = $scope.$parent[attrs['getEvents']];
            drawEvents();
          }
        }));
      }

      element.bind('$destroy', function() {
        element.unbind('$destroy');
        watches.map(function(unwatch) {
          unwatch();
        });
      });

      var selectDate;
      var selectDateCallback = $scope.$parent[attrs['selectDate'].split('(')[0]];

      var firstDayOfWeek = parseInt(attrs['firstDayOfWeek'], 10) || 0;

      $scope.selectDate = function(day) {
        if(selectDate !== undefined) {
          selectDate.isSelected = false;
        }
        selectDate = day;
        day.isSelected = true;
        if(selectDateCallback !== undefined) {
          selectDateCallback(day);
        }
      };

      $scope.dayNames = [];
      for (var i = firstDayOfWeek; i < firstDayOfWeek+7; i++) {
        $scope.dayNames.push(
          moment(new Date()).startOf('week').add('days', i).format('ddd')
        );
      }
      
      function updateMonth(date) {
        $scope.month = date.format('MMMM - YYYY');
      }

      function buildCalendar(current) {
        current = current.clone();
        current.startOf('month');//1er jour du mois
        var calendar = [];
        var date = current.clone();
        date.subtract('days', current.format('d') - firstDayOfWeek);//1er lundi avant
        if(current.format('d') - firstDayOfWeek < 0) {//le 1er lundi n'est pas le 1er jour du mois
          date.subtract('days', 2);
          date.subtract('days', date.format('d') - firstDayOfWeek);//1er lundi avant
        }
        var allDays = 0;
        var week = 0;
        var endOfMonth = current.clone();
        endOfMonth.endOf('month');
        while(date.isBefore(endOfMonth)) {
          if(allDays % 7 === 0 && allDays !== 0) {
            week++;//new week
          }
          calendar[week] = calendar[week] || [];
          calendar[week].push({
            moment: date.clone(),
            dayOfWeek: date.format('D'),
            isSameMonth: date.month() === current.month(),
            isToday: date.month() === today.month() && date.date() === today.date() && date.year() === today.year()
          });
          if(defaultSelectedDate !== undefined && date.month() === defaultSelectedDate.month() && date.date() === defaultSelectedDate.date() && date.year() === defaultSelectedDate.year()) {
            calendar[week][calendar[week].length-1].isSelected = true;
            selectDate = calendar[week][calendar[week].length-1];
          }
          date.add('days', 1);
          allDays++;
        }
        while(date.format('d') !== ''+firstDayOfWeek) {
          calendar[week].push({
            moment: date.clone(),
            dayOfWeek: date.format('D'),
            isSameMonth: false,
            isToday: false
          });
          date.add('days', 1);
        }
        $scope.calendar = calendar;
      }

      function drawEvents() {
        var addEvents = function(events) {
          events.map(function(event) {
            var date = moment(event.date);
            if(date.month() === firstDate.month()) {
              var week = (0 | date.date() / 7);
              var day = parseInt(date.format('d'), 10) - firstDayOfWeek;
              if(day < 0) {
                day = 7 + day;//7 + -1 = 6; 7 + -2 = 5;
              }
              console.log($scope.calendar, week, day);
              var calendarDate = $scope.calendar[week][day];
              calendarDate.events = calendarDate.events || [];
              calendarDate.events.push(event);
            }
          });
        };

        addEvents(events);

        if(getEventsFunction) {
          var startDate = firstDate.clone().startOf('month');
          var endDate = firstDate.clone().endOf('month');
          console.log(startDate.toDate(), endDate.toDate());
          console.log(startDate.format('d'));
          getEventsFunction(startDate.toDate(), endDate.toDate(), function(newEvents) {
            console.log(newEvents);
            addEvents(newEvents);
          });
        }
      }
      
      updateMonth(firstDate);
      buildCalendar(firstDate);
      drawEvents();
      
      $scope.prevMonth = function() {
        firstDate.subtract('months', 1);
        updateMonth(firstDate);
        buildCalendar(firstDate);
        drawEvents();
      };
      
      $scope.nextMonth = function() {
        firstDate.add('months', 1);
        updateMonth(firstDate);
        buildCalendar(firstDate);
        drawEvents();
      };

    }
  };
  
}]);