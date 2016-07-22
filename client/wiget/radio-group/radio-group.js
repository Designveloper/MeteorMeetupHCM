Template.radioGroup.helpers({
  'name': function(){
    return this.name?this.name:"";
  },
  'group_name': function(){
    var parent = Template.parentData(1);
    return parent.group_name?parent.group_name:"radio-group";
  }
})

Template.radioGroup.events({
  'change input[type=radio]': function(e,tpl){
    var el = $(e.currentTarget);
    var value = el.val();
    if (value !== "on")
      $(tpl.$('.radio-group-value')).val(value).trigger('change');
  },
  'change input.radio-el-value': function(e,tpl){
    var el = $(e.currentTarget);
    var value = el.val();
    var radio = el.parents('.a-radio-option').find('input[type=radio]');
    radio.val(value).prop('checked',true);
    $(tpl.$('.radio-group-value')).val(value).trigger('change');
  }
})