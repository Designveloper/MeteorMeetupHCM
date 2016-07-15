Template.eventDataTemplate.helpers({
  'subData': function(){
    Meteor.subscribe('voteByTypeNId', 'event', this._id);
  },
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
  }
});

Template.eventDataTemplate.events({
  'change input': function(e,tpl){
    var _id = e.currentTarget.getAttribute('data-id');
    var data = ENUM.getDataByEvent(e);
    var base = {type:'event', reference_id: _id, byUser: Meteor.userId()};
    var vote = Vote.findOne(base);
    if (vote)
      return  Vote.update({_id: vote._id},{$set: data});
    Vote.insert(_.extend(base,data));
  }
})
