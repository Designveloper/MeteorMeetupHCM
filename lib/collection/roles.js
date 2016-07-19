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
Roles.allow({
  insert: function(userId, doc){
    //TODO check group permission
    return true;
  },
  update: function(userId, doc, fields){
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