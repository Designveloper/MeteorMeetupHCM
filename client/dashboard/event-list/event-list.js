Template.eventListTemplate.helpers({
  'events': function () {
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    if (this.type = "upcoming")
      return EventData.find({
        group_id: {$in: groupList},
        date: {$gte: new Date()},
        status: ENUM.EVENT_STATUS.OPENING
      }, {limit: 1}).fetch();
    return EventData.find({group_id: {$in: groupList}}).fetch();
  },
  'routeToEvent': function () {
    return Meteor.absoluteUrl("event/" + this._id);
  }
})