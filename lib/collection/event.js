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
  location: {
    type: geoSchema
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
  max_mem: {
    type: Number,
    optional: true
  }
}, baseSchema])

EventData = new Mongo.Collection('event');
EventData.attachSchema(eventSchema);

DB.event = EventData;