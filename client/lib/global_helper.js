Template.registerHelper('formatTime',function(time){
  return moment(ENUM.formatDateObject(time)).format('MM/DD/YYYY, hh:mm:ss');;
})