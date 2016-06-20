var voteSchema = new SimpleSchema([{
  type: {
    type: String
  },
  value: {
    type: String
  },
  reference_id: {
    type: String
  },
  byUser: {
    type: String,
    custom: function(){
      if (this.isInsert){
        if (Vote.findOne({type: this.field('type').value, reference_id: this.field('reference_id').value, byUser: this.value}))
          return 'unique';
      }
    }

  }
}, baseSchema]);

voteSchema.messages({
  "unique": "unique"
});

Vote = new Mongo.Collection('vote');
Vote.attachSchema(voteSchema);
Vote.allow({
  'update': function (userId, doc, fields, modifier){
    if (!ENUM.checkFields(ENUM.ALLOW_FIELDS.VOTE,fields)) return false;
    if (userId) {
      return true;
    }
  }
});
Vote.deny({
  'remove': function(){
    return true;
  }
})