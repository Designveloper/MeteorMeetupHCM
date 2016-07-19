Template.eventPanelTemplate.helpers({
  'routeToEvent': function () {
    return Meteor.absoluteUrl("event/" + this._id);
  },
  'mapName': function () {
    return "map-event-" + this._id;
  },
  'isJoinedEvent': function(){
    var votes = Vote.find({type:'event', reference_id: this._id, byUser: Meteor.userId()}).fetch();
    if (votes.length){
      var vote = votes[0];
      return vote.is_joined;
    }
  },
})
