Template.voteWiget.helpers({
  'max': function () {
    return this.max || 5;
  },
  'min': function () {
    return this.min || 1;
  },
  'value': function(){
    return parseInt(this.value);
  }
})
Template.voteWiget.onRendered(function () {
  var el = $(this.$(".rating"));
  var rate = el.rating();
  if (this.data.readonly)
    rate.setReadonly()
})