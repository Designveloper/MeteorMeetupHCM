Meteor.methods({
  'group_create': function (data) {
    checkRolesInFunction();
    var tags = data.tags;
    delete  data.tags;
    var groupId = Group.insert(data);
    Roles.upsert({
      type: ENUM.ROLES_TYPE['owner_group'],
      userId: this.userId,
      ref: groupId
    }, {$set: {ref: groupId}});
    for (let tag of tags) {
      Tags.upsert({
        name: tag,
        ref: groupId,
        type: ENUM.TAGS_TYPE['group']
      }, {$set: {ref: groupId}});
    }
  },
  'group_remove': function (groupId) {
    Group.remove({_id: groupId});
    Roles.remove({ref: groupId});
  }
})
