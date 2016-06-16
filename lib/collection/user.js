var userSchema = new SimpleSchema([{
  services: {
    type: Object,
    blackbox: true
  },
  profile: {
    type: Object,
    blackbox:true
  },
  emails: {
    type: Object,
    blackbox: true,
    optional: true
  },
  username:{
    type: String,
    optional: true
  },
  groups:{
    type: Object,
    blackbox: true
  }
},baseSchema]);

Meteor.users.attachSchema(userSchema);
