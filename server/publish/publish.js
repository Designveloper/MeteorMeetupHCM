Meteor.publish(null, function () {
  if (!this.userId) return this.ready();
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      'services.google.email': 1,
      'services.google.picture': 1,
      quickInfo: 1,
      groups: 1
    }
  });
});
Meteor.publish('eventNGroupByUser', function () {
  if (!this.userId) return this.ready();
  var user = Meteor.users.findOne(this.userId);
  var groupList = user.groups;
  return [EventData.find({group_id: {$in: groupList}}), Group.find({_id: {$in: groupList}})]
});
Meteor.publish('allGroups', function () {
  if (!this.userId) return this.ready();
  return Group.find({});
});
Meteor.publish('eventById', function (eventId) {
  if (!this.userId) return this.ready();
  return EventData.find({_id: eventId})
});
Meteor.publish('topicsHold', function (eventId) {
  if (!this.userId) return this.ready();
  return Topic.find({event_id: eventId})
});
Meteor.publish('voteTopics', function (_type) {
  if (!this.userId) return this.ready();
  return Vote.find({type: _type})
});
