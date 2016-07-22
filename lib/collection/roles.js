var roleSchema = new SimpleSchema([{
  type: {
    type: typeSchema,
    custom: function () {
      if (this.isInsert || this.isUpdate || this.isUpsert) {

        //TODO setOwner when createGroup
        if (this.field('context') && this.field('context').value === Roles.contextList.isCreateGroup) {
          console.log('context', this.field('context').value);
          return;
        }
        //TODO just have one organizer
        var ref = this.field('ref').value;
        var userId = this.userId;
        if (this.value && this.value.text === 'organizer') {
          if (Roles.findOne(getSelector(_.extend(ENUM.roles.QUERY('group', 'organizer'), {ref: ref})))) {
            return "one-organizer";
          }
        }
        //TODO must larger role to update a role
        try {
          var userRole = Roles.findOne(getSelector({userId: userId, ref: ref}));
          var memRole = Roles.findOne(getSelector({
              userId: this.field('userId').value,
              ref: ref
            })) || {type: ENUM.ROLES_TYPE.group.member};
          console.log('userRole', userRole);
          console.log('memRole', memRole);
          if (userRole.type.value >= memRole.type.value)
            return "must-larger";
          if (userRole.type.value > this.value.value) {
            return "must-larger-next"
          }
        } catch (e) {
          console.error(e.stack);
          return "wrong-permission"
        }

      }

    }
  },
  userId: {
    type: String
  },
  ref: {
    type: String
  },
  context: {
    type: String,
    optional: true
  }
}, baseSchema]);
roleSchema.messages({
  'one-organizer': "A group just have only one organizer",
  'must-larger': "Your current role must larger than the member",
  'must-larger-next': "Your current role must larger or equal than the role set to the member",
  'wrong-permission': "You don't have permission to change the role"
});

Roles = new Mongo.Collection('roles');
Roles.attachSchema(roleSchema);
Roles.contextList = {
  isCreateGroup: "isCreateGroup"
}
Roles.allow({
  insert: function (userId, doc) {
    //TODO check group permission
    return true;
  },
  update: function (userId, doc, fields) {
    //TODO check group permission
    return true;
  }
});
Roles.deny({
  'remove': function () {
    return true;
  }
})

DB.Roles = Roles;