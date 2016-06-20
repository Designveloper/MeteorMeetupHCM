Meteor.users.allow({
  'update': function (userId, doc, fields, modifier) {
    if (!ENUM.checkUserFields(fields)) return false;
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