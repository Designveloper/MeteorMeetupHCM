Meteor.methods({
  'user_update_groups': function (groups) {
    checkRolesInFunction();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {groups: groups}})
  },
  'user_update_role': function(){
    checkRolesInFunction();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {groups: groups}})
  }
});
