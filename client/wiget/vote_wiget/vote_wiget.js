Template.voteWiget.helpers({
  'max': function () {
    return this.max || 5;
  },
  'min': function () {
    return this.min || 1;
  },
  'hasValue': function () {
    var hasValue = !!this.value;
    var value = this.value;
    if (hasValue) {
      var tpl = Template.instance();
      if (!tpl.isFirstChange) {
        tpl.isFirstChange = true;
        tpl.rate = null;
      }
      if (tpl.voteValue)
        tpl.voteValue.set(value);
    }
    return hasValue;
  },
  'reRender': function(){
    var tpl = Template.instance();
    setTimeout(function(){
      tpl.rate = $(tpl.$(".rating")).rating();
      if (this.data.readonly) {
        this.rate.setReadonly();
      }
    },0 );
  }
})
Template.voteWiget.onRendered(function () {
  this.voteValue = new ReactiveVar();
  var self = this;
  this.autorun(function () {
    var value = self.voteValue.get();
    if (value) {
      if (self.rate && self.data.readonly)
        return self.rate.updateValue(self.$(".vote-widget"), value);
    }
  })

})