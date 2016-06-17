Template.eventListTemplate.helpers({
  'events': function(){
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    return EventData.find({group_id: {$in: groupList}}).fetch();
  },
  'routeToEvent': function(){
    return Meteor.absoluteUrl("event/"+this._id);
  }
})