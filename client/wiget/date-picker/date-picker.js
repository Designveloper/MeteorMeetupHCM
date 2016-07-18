Template.datePicker.helpers({
  'configCls': function(){
    return (this.configCls)?this.configCls:'';
  },
  'idEL': function(){
    return this.idEL?this.idEL:'date-input';
  },
  'name': function(){
    return this.name?this.name:'';
  },
  'date': function(){
    return this.data?this.data:'';
  }
});
Template.datePicker.onRendered(function(){
  $(this.$('.date-picker')).datepicker({
    startDate: '+1d'
  });
});
