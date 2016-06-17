Template.allGroupListTemplate.helpers({
  'groups': function(){
    return Group.find({}).fetch();
  }
})
