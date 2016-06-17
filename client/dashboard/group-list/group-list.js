Template.groupListTemplate.helpers({
  'groups': function(){
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    return Group.find({_id: {$in: groupList}}).fetch();
  }
})