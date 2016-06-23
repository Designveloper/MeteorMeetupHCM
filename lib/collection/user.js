Meteor.users.allow({
  'update': function (userId, doc, fields, modifier) {
    console.log('allow field',fields);
    if (!ENUM.checkFields(ENUM.ALLOW_FIELDS.USER,fields)) return false;
    if (userId && doc.userId === userId) {
      return true;
    }
  }
})
Meteor.users.deny({
  'remove': function () {
    return true;
  }
})

DB.user = Meteor.users;