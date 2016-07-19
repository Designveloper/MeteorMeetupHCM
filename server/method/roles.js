Meteor.methods({
  'roles_remove': function(data){
    checkRolesInFunction();
    Roles.update({
      type: ENUM.ROLES_TYPE[data.type],
      userId: this.userId,
      ref: data.group_id
    }, {$set: {delete_flg: 1}});
  }
})
