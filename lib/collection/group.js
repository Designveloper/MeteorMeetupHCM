var groupSchema = new SimpleSchema([{
  name: {
    type: String
  },
  image: {
    type: String,
    optional: true
  },
  des: {
    type: String,
    optional: true
  }


}, baseSchema]);

Group = new Mongo.Collection('group-user');
Group.attachSchema(groupSchema);

//TODO must set permission for insert, update, del
DB.group = Group;