angular.module('publicApp').factory('CalendarMonthService', [
  function() {

    var buildHeaderCalendar = function buildHeaderCalendar(current, firstDayOfWeek) {
      var calendar = [];
      var date = current.clone();
      var dayIndex;
      for(dayIndex=0; dayIndex<7; dayIndex++) {
        calendar[dayIndex] = { header: date.format('ddd'), lines: [] };
        date.add('days', 1);
      }
      return calendar;
    };

    var buildBodyCalendar = function buildBodyCalendar(current, calendar, firstDate, endDate) {
      var date = firstDate.clone();
      var today = moment(new Date());
      var allDays = 0;
      while(date.isBefore(endDate)) {
        calendar[allDays % 7].lines.push({
          type: 'month',
          moment: date.clone(),
          title: date.format('D'),
          isSameMonth: date.month() === current.month(),
          isToday: date.month() === today.month() && date.date() === today.date() && date.year() === today.year()
        });
        date.add('days', 1);
        allDays++;
      }

    };

    return {
      buildHeaderCalendar: buildHeaderCalendar,
      buildBodyCalendar: buildBodyCalendar,
      buildTitle: function(current) {
        return current.format('MMMM - YYYY');
      }
    };

  }

]);