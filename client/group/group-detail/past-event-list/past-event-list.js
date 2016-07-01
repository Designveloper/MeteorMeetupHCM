Template.pastEventListTemplate.helpers({
  'events': function(){
    var user = Meteor.user();
    if (!user) return;
    return EventData.find({group_id: ENUM.groupId(), date: {$lt: new Date()}}).fetch();
  },
  'routeToEvent': function () {
    return Meteor.absoluteUrl("event/" + this._id);
  },
  'voteValue': function(){
    Meteor.subscribe('countWentMember', this._id);
    Meteor.subscribe('countStarByEvent', this._id);
    var total_member = Counts.get('members-went-event-' +  this._id);
    if (total_member > 0) {
      return parseInt(Counts.get('total-star-of-event-by-id-' + this._id) / total_member)
    }
    return 0
  }
})
