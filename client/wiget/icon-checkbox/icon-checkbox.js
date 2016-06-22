Template.iconCheckbox.helpers({
  'noActive': function () {
    return !!this.href;
  },
  'isText': function () {
    return !!this.text;
  },
  'getText': function () {
    return this.text.split('/')[0];
  },
  'getActiveText': function () {
    return this.text.split('/')[1];
  },
  'iconSize': function () {
    return this.iconSize || 'icon';
  },
  'iconActive': function () {
    return this.iconActive || this.icon + ' icon-checkbox-active';
  },
  'isActive': function () {
    var tpl = Template.instance();
    if (tpl.isActive)
      tpl.isActive.set(this.isChecked);
    return !!this.isChecked;
  }
});
Template.iconCheckbox.events({
  'click a.icon-checkbox': function (e, tpl) {
    e.preventDefault();
    var el = $(e.currentTarget);
    var input = el.parent().find('input');
    input.trigger('click');
  },
  'click a.icon-checkbox-no-active': function (e, tpl) {
    e.preventDefault();
    var href = e.currentTarget.getAttribute('href');
    window.open(href);
  }
});
Template.iconCheckbox.onRendered(function(){
  var self = this;
  self.isActive = new ReactiveVar();
  self.autorun(function(){
    $(self.$('.icon-checkbox-input')).prop('checked', !!self.isActive.get());
  })
})