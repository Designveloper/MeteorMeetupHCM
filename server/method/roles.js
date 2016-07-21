Meteor.methods({
  'roles_remove': function (data) {
    checkRolesInFunction();
    try {
      var selector = ENUM.roles.QUERY(data.type, data.role)
    } catch (e) {
      throw  e;
    }
    Roles.update(getSelector(_.extend(selector, {
      userId: data.user_id,
      ref: data.ref
    })), {$set: {delete_flg: 1}}, {multi: true});
  },
  'roles_update': function (data) {
    try {
      var typeQuery = ENUM.roles.QUERY(data.type, data.role);
      var typeUpsert = ENUM.ROLES_TYPE[data.type][data.role];
    } catch (e) {
      throw  e;
    }
    var currentRoles = Roles.find(getSelector({
      userId: data.user_id,
      ref: data.ref
    })).map(function(role){
      if (role.type.text === data.role)
        throw new Error('400','You are updating same role');
      return role._id;
    });
    var disableAvailableRole = function(){
      Roles.update({_id: {$in: currentRoles}}, {$set: {delete_flg: 1}}, {multi: true});
    };
    if (data.role === 'member')
      return disableAvailableRole();
    try {
      //only have a role available
      Roles.upsert(getSelector(_.extend(typeQuery, {
        userId: data.user_id,
        ref: data.ref,
      })), {$set: {type: typeUpsert, delete_flg: 0}});
      disableAvailableRole();
    } catch (e){
      //rollback
      if (currentRoles.length)
        Roles.update({_id: currentRoles[0]},{$set: {delete_flg: 0}});
      throw  e;
    }
  }
})
