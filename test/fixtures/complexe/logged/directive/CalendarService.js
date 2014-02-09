angular.module('publicApp').factory('CalendarService', [
  'CalendarMonthService', 'CalendarWeekService',
  function(calendarMonthService, calendarWeekService) {

    var TYPE = {
      month: 'month',
      week: 'week'
    };

    var buildCalendar = function buildCalendar(type, current, firstDayOfWeek, getEventsCallback) {
      type = type || TYPE.month;
      current = current || moment(new Date());
      firstDayOfWeek = firstDayOfWeek || 0;

      current = current.clone();
      var date = findFirstDay(type, current, firstDayOfWeek);
      var endOf = findLastDay(type, current, firstDayOfWeek);

      var calendar = buildHeaderCalendar(type, date, firstDayOfWeek);

      buildBodyCalendar(type, current, calendar, date, endOf);

      if(getEventsCallback) {
        getEventsCallback(date.toDate(), endOf.toDate(), function(events) {
          for(var i=0, l=events.length; i<l; i++) {
            var event = events[i];
            for(var ii=0, ll=calendar.length; ii<ll; ii++) {
              var column = calendar[ii];
              for(var iii=0, lll = column.lines.length; iii<lll; iii++) {
                var line = column.lines[iii];
                if(line.moment) {
                  var date = moment(event.date);
                  //TODO move this into services
                  if(line.moment.date() === date.date() &&
                    line.moment.month() === date.month() &&
                    line.moment.year() === date.year() && 
                    type === 'month') {
                    event.line = line;
                    line.events = line.events || [];
                    line.events.push(event);
                    if(line.events.length === 4) {
                      var moreEvent = {
                        type: 'moreEvent',
                        title: 'others...',
                        style: {
                          textAlign: 'right',
                          textDecoration: 'none'
                        },
                        date: line.moment
                      };
                      line.events.splice(2, 0, moreEvent);
                    }
                  } else if(line.moment.date() === date.date() &&
                    line.moment.month() === date.month() &&
                    line.moment.year() === date.year() && 
                    line.moment.hour() === date.hour() &&
                    type === 'week') {
                    event.line = line;
                    event.style = event.style || {};
                    event.style.height = (event.duration * 100) + '%';
                    line.events = line.events || [];
                    line.events.push(event);
                  }
                }
              }
            }
          }
        });
      }

      return calendar;
    };

    var findFirstDay = function findFirstDay(type, current, firstDayOfWeek) {
      var date = current.clone();
      if(type === TYPE.month) {
        date = date.startOf(type).clone();
      }
      while(date.format('d') !== ''+firstDayOfWeek) {
        date.subtract('days', 1);
      }
      return date;
    };

    var findLastDay = function findLastDay(type, current, firstDayOfWeek) {
      var date = current.clone();
      date.endOf(type);
      var lastDayOfWeek = firstDayOfWeek - 1;
      if(lastDayOfWeek < 0) {
        lastDayOfWeek = 6;
      }
      while(date.format('d') !== ''+lastDayOfWeek) {
        date.add('days', 1);
      }
      return date;
    };

    var buildHeaderCalendar = function buildHeaderCalendar(type, current, firstDayOfWeek) {
      if(type === TYPE.month) {
        return calendarMonthService.buildHeaderCalendar(current, firstDayOfWeek);
      } else if(type === TYPE.week) {
        return calendarWeekService.buildHeaderCalendar(current, firstDayOfWeek);
      } else {
        throw new Exception('Type '+type+' is not implemented in CalendarService::buildHeaderCalendar !');
      }
      
    };

    var buildBodyCalendar = function buildBodyCalendar(type, current, calendar, firstDate, endDate) {
      var date = firstDate.clone();
      var today = moment(new Date());

      if(type === TYPE.month) {
        calendarMonthService.buildBodyCalendar(current, calendar, firstDate, endDate);
      } else if(type === TYPE.week) {
        calendarWeekService.buildBodyCalendar(current, calendar, firstDate, endDate);
      } else {
        throw new Exception('Type '+type+' is not implemented in CalendarService::buildBodyCalendar !');
      }

    };

    return {
      TYPE: TYPE,
      buildCalendar: buildCalendar,
      buildTitle: function(type, current) {
        if(type === TYPE.month) {
          return calendarMonthService.buildTitle(current);
        } else if(type === TYPE.week) {
          return calendarWeekService.buildTitle(current);
        }
      }
    };

  }
]);