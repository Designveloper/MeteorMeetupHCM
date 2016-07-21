var roleSchema = new SimpleSchema([{
  type: {
    type: typeSchema,
    custom: function(){
      if (this.isInsert || this.isUpdate || this.isUpsert){
        //TODO just have one organizer
        if (this.value && this.value.text === 'organizer'){
          var ref = this.field('ref').value;
          return Roles.findOne(_.extend(ENUM.roles.QUERY('group','organizer'),{ref: ref}))?"one-organizer":null;
        }
      }

    }
  },
  userId: {
    type: String,
  },
  ref: {
    type: String
  }
}, baseSchema]);
roleSchema.messages({
  'one-organizer': "A group just have only one organizer"
})

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