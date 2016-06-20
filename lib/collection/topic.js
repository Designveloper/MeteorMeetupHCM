var topicSchema = new SimpleSchema([{
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
  content: {
    type: String,
    optional: true
  },
  event_id: {
    type: String
  }
}, baseSchema]);

Topic = new Mongo.Collection('topic');
Topic.attachSchema(topicSchema);