var eventSchema = new SimpleSchema([{
  group_id: {
    type: String
  },
  name: {
    type: String
  },
  image: {
    type: String,
    optional: true
  },
  position_geo: {
    type: Object,
    blackbox: true
  },
  description: {
    type: String,
    optional: true
  }
}, baseSchema])

EventData = new Mongo.Collection('event');
EventData.attachSchema(eventSchema);