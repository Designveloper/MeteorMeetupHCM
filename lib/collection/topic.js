
var topicSchema = new SimpleSchema({
  'image': {
    type: String,
    optional: true
  },
  'title': {
    type: String
  },
  timeEst: {
    type: Number
  },
  vote_id :{
    type: String
  },
  content: {
    type: String,
    optional: true
  }
});

Topic = new Mongo.Collection('topic');
Topic.attachSchema(topicSchema);