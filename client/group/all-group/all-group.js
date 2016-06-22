Template.allGroupTemplate.helpers({
  'notAllGroup': function(){
    return Group.find().count() < Counts.get('total-group')
  }
})
