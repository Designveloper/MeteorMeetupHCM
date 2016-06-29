// Simply 'inherites' helpers from AccountsTemplates
Template.atForm.helpers(_.extend(AccountsTemplates.atFormHelpers,{
  'isCordova': function(){
  return (Meteor.isCordova)
  }
}));