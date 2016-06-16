var voteSchema = new SimpleSchema([{
  type: {
    type: String
  },
  value: {
    type: String
  }
}, baseSchema])

Vote = new Mongo.Collection('vote');
Vote.attachSchema(voteSchema);