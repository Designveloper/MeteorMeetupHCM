Template.calendarUpcomingTemplate.onRendered(function(){
  $('#groupSchedule').datepicker({
    inline: true,
    sideBySide: true,
    multidate: true,
    todayHighlight: true,
    defaultViewDate: { year: 1977, month: 04, day: 25 },
  });
  $('#groupSchedule').datepicker('setDate', '06/06/2016','06/16/2016','06/26/2016');
})
