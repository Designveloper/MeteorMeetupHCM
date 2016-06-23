Template.voteWiget.helpers({
  'max': function () {
    return this.max || 5;
  },
  'min': function () {
    return this.min || 1;
  },
  'value': function () {
    var tpl = Template.instance();
    var value = this.value;
    if (tpl.voteValue)
      tpl.voteValue.set(value);
    return value;
  },
  'hasValue': function () {
    var hasValue = !!this.value;
    var value = parseInt(this.value);
    if (hasValue) {
      var tpl = Template.instance();
      tpl.rate = null;
    }
    return hasValue;
  }
})
Template.voteWiget.onRendered(function () {
  this.voteValue = new ReactiveVar();
  var el = $(this.$(".rating"));
  this.rate = el.rating();
  if (this.data.readonly) {
    this.rate.setReadonly();
  }
  var self = this;
  this.autorun(function () {
    var value = self.voteValue.get();
    if (value) {
      if (self.rate)
        return self.rate.updateValue(value);
      self.rate = $(self.$(".rating")).rating();
    }
  })

})