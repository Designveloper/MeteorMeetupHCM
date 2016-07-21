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
    Roles.update({
      userId: data.user_id,
      ref: data.ref
    }, {$set: {delete_flg: 1}}, {multi: true});
    if (data.role === 'member')
      return;
    try {
      var typeQuery = ENUM.roles.QUERY(data.type, data.role);
      var typeUpsert = ENUM.ROLES_TYPE[data.type][data.role];
    } catch (e) {
      throw  e;
    }
    Roles.upsert(getSelector(_.extend(typeQuery, {
      userId: data.user_id,
      ref: data.ref,
    })), {$set: {type: typeUpsert, delete_flg: 0}})
  }
})
