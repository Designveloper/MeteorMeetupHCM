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
  attachment: {
    type: String,
    optional: true
  },
  event_id: {
    type: String
  }
}, baseSchema]);

Topic = new Mongo.Collection('topic');
Topic.attachSchema(topicSchema);

Topic.allow({
  insert: function(userId, doc){
    //TODO check group permission
    return true;
  },
  update: function(userId, doc, fields){
    //TODO check group permission
    return true;
  }
})
DB.topic = Topic;