angular.module('publicApp').factory('CalendarWeekService', [
  function() {

    var buildHeaderCalendar = function buildHeaderCalendar(current, firstDayOfWeek) {
      var calendar = [];
      var date = current.clone();
      var dayIndex;
      calendar[0] = { header: 'Hours', lines: [] };
      for(dayIndex=1; dayIndex<8; dayIndex++) {
        calendar[dayIndex] = { header: date.format('ddd') + ' ' + date.format('D'), lines: [] };
        date.add('days', 1);
      }
      return calendar;
    };

    var buildBodyCalendar = function buildBodyCalendar(current, calendar, firstDate, endDate) {
      var date = firstDate.clone();
      var today = moment(new Date());
      var nbDays = endDate.diff(date, 'days') + 4;//2 for first and last days
      console.log('Fix me : '+nbDays+' must be ==> 8');
      for(var day=0; day<8; day++) {
        for(var hour=0; hour<24; hour++) {
          if(day === 0) {
            calendar[day].lines.push({
              title: hour
            });
          } else {
            calendar[day].lines.push({
              type: 'week',
              moment: date.clone().hour(hour),
              title: '',
              isSameMonth: date.month() === current.month(),
              isToday: date.month() === today.month() && date.date() === today.date() && date.year() === today.year()
            });
          }
        }
        if(day > 0) {//column 0 is hours
          date.add('days', 1);
        }
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