Meteor.methods({
  'group_create': function (data) {
    checkRolesInFunction();
    var tags = data.tags;
    delete  data.tags;
    var groupId = Group.insert(data);
    //Set Role for the user    try {
    var roleId = Roles.insert({
      userId: this.userId,
      ref: groupId,
      type: ENUM.ROLES_TYPE.group.organizer,
      context: Roles.contextList.isCreateGroup
    });
    Roles.update({_id: roleId}, {$unset: {context: ''}});
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
    Meteor.users.update({_id: this.userId}, {
      $set: {
        groups: ENUM.removeOneInArray(Meteor.users.findOne(this.userId), 'groups', groupId)
      }
    });
    Tags.remove({ref: groupId});
  }
})
