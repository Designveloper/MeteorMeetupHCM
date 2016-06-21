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
  el.rating(this.data.value);
})