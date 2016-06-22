Template.iconCheckbox.helpers({
  'noActive': function(){
    return !!this.href;
  },
  'iconSize': function(){
    return this.iconSize || 'icon';
  },
  'iconActive': function(){
    return this.iconActive || this.icon + ' icon-checkbox-active';
  },
  'isActive': function(){
    var tpl = Template.instance();
    if (!tpl.isActive)
      tpl.isActive = new ReactiveVar(false);
    return tpl.isActive.get();
  }
});
Template.iconCheckbox.events({
  'click a.icon-checkbox': function(e,tpl){
    e.preventDefault();
    var el = $(e.currentTarget);
    var input = el.parent().find('input');
    input.prop('checked',tpl.isActive.get());
    input.trigger('click');
    tpl.isActive.set(!tpl.isActive.get());

  },
  'click a.icon-checkbox-no-active': function(e,tpl){
    e.preventDefault();
    var href = e.currentTarget.getAttribute('href');
    window.open(href);
  }
})
