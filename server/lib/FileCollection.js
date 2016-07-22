Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: '/app/upload/open_meetup/image'})]
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

Attachments = new FS.Collection("attachments", {
  stores: [new FS.Store.FileSystem("attachments", {path: "/app/upload/open_meetup/attach"})]
});

Meteor.publish('attachById', function (id) {
  return Attachments.find({_id: id});
})
Attachments.allow({
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
