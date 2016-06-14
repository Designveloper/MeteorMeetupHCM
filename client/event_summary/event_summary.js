import '../../imports/plugin/flot/index.js'
Template.eventSummaryTemplate.onRendered(function () {
  Tracker.autorun(function () {
    ENUM.plotPieByData(ENUM.Ages(), 'flot-pie-ages', 'EventCountAge', 'Age')
  });
  Tracker.autorun(function () {
    ENUM.plotPieByData(ENUM.Titles, 'flot-pie-titles', 'EventCountTitle', 'Title')
  });
  Tracker.autorun(function () {
    ENUM.plotBarByData(ENUM.Rates, 'flot-bar-rates', 'EventCountRate', 'Rate')
  });
})