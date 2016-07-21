Meteor.methods({
  'user_update_groups': function (groups) {
    checkRolesInFunction();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {groups: groups}})
  },
  'user_remove_out_group': function(data){
    checkRolesInFunction();
    var groups = [];
    try {
      groups = Meteor.users.findOne(data.user_id).groups;
      var pos = groups.indexOf(data.ref);
      if (pos >= 0){
        groups.splice(pos,1);
      }
    } catch (e){
      throw e
    }
    Meteor.users.update({_id: data.user_id}, {$set: {groups: groups}});
    Meteor.call('roles_remove',data);
  }
});
