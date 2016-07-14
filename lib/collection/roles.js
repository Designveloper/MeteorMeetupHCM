var roleSchema = new SimpleSchema([{
  type: {
    type: typeSchema
  },
  userId: {
    type: String,
  },
  ref: {
    type: String
  }
}, baseSchema]);

Roles = new Mongo.Collection('roles');
Roles.attachSchema(roleSchema);

Roles.deny({
  'remove': function () {
    return true;
  },
  'insert': function () {
    return true;
  },
  'update': function () {
    return true;
  }
})

DB.Roles = Roles;