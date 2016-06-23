Template.calendarWidget.helpers({
  'renderData': function () {
    var hasData = !!this.data;
    var data = this.data;
    if (hasData) {
      var tpl = Template.instance();
      setTimeout(function () {
        var el = $(tpl.$('.calendar-widget'));
        if (!Array.isArray(data.upDate))
          return;
        var date = [];
        for (let aDate of data.upDate) {
          let dateStr = moment(ENUM.formatDateObject(aDate)).format('MM/DD/YYYY');
          if (date.indexOf(dateStr) === -1)
            date.push(dateStr)
        }
        var arg = ['setDate'].concat(date);
        el.datepicker.apply(el, arg)
      }, 0)
    }
  }
});
Template.calendarWidget.onRendered(function () {
  var el = $(this.$('.calendar-widget'));
  var date = new Date();
  el.datepicker({
    inline: true,
    sideBySide: true,
    multidate: true,
    todayHighlight: true,
    defaultViewDate: {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    },
  });
})
