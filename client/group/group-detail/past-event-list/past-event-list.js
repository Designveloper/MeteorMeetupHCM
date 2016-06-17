Template.pastEventListTemplate.helpers({
  'events': function(){
    var user = Meteor.user();
    if (!user) return;
    var groupList = user.groups;
    return EventData.find({group_id: {$in: groupList}, date: {$lt: new Date()}}).fetch();
  }
})
