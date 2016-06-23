Template.calendarUpcomingTemplate.onRendered(function(){
  $('#datetimepicker12').datepicker({
    inline: true,
    sideBySide: true,
    multidate: true,
    todayHighlight: true,
    defaultViewDate: { year: 1977, month: 04, day: 25 },
  });
  $('#datetimepicker12').datepicker('setDate', '06/06/2016','06/16/2016','06/26/2016');
})
