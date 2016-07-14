var tagSchema = new SimpleSchema([{
  name: {
    type: String
  },
  ref: {
    type: String
  },
  type: {
    type: typeSchema
  }
}, baseSchema]);

Tags = new Mongo.Collection('tags');
Tags.attachSchema(tagSchema);

DB.Tags = Tags;