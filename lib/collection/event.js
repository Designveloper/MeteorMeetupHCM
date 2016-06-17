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
  date: {
    type: Date
  },
  description: {
    type: String,
    optional: true
  },
  status: {
    type: Number
  },
}, baseSchema])

EventData = new Mongo.Collection('event');
EventData.attachSchema(eventSchema);