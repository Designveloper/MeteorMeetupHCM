Meteor.methods({
  'group_create': function (data) {
    checkRolesInFunction();
    var tags = data.tags;
    delete  data.tags;
    var groupId = Group.insert(data);
    //Set Role for the user
    try {
      var typeQuery = ENUM.roles.QUERY('group','organizer');
      var typeUpsert = ENUM.ROLES_TYPE.group.organizer;
    } catch (e) {
      throw  e;
    }
    Roles.upsert(_.extend(typeQuery,{
      userId: this.userId,
      ref: groupId
    }), {$set: {ref: groupId, type: typeUpsert, context: Roles.contextList.isCreateGroup}});
    Meteor.users.update({_id: this.userId}, {$push: {groups: groupId}});
    for (let tag of tags) {
      Tags.upsert({
        name: tag,
        ref: groupId,
        type: ENUM.TAGS_TYPE['group']
      }, {$set: {ref: groupId}});
    }
    return groupId;
  },
  'group_remove': function (groupId) {
    checkRolesInFunction();
    Group.remove({_id: groupId});
    Roles.remove({ref: groupId});
    Meteor.users.update({_id: this.userId}, {$set: {
      groups: ENUM.removeOneInArray(Meteor.users.findOne(this.userId), 'groups', groupId)
    }});
    Tags.remove({ref: groupId});
  }
})
