Template.pastEventListTemplate.helpers({
  'events': function(){
    var user = Meteor.user();
    if (!user) return;
    return EventData.find({group_id: ENUM.groupId(), date: {$lt: new Date()}}).fetch();
  },
  'routeToEvent': function () {
    return Meteor.absoluteUrl("event/" + this._id);
  }
})
