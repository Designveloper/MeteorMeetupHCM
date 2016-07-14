Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: '~/upload/open_meetup'})]
});

Meteor.publish('imageById', function (id) {
  return Images.find({_id: id});
})
Images.allow({
  'insert': function(userId, doc){
    if (userId) {
      return true;
    }
  },
  'update': function (userId, doc, fields, modifier) {
    if (userId) {
      return true;
    }
  },
  download: function(userId, fileObj) {
    return true
  }
})