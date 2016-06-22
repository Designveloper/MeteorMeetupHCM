Template.map2HoldTemplate.helpers({
  'eventData': function(){
    if (this.isFeedback)
      return Template.parentData(1);
    return this;
  },
  'mapName': function () {
    return "map-event-ended-" + this._id;
  },
  'getMembersJoined': function(){
    return Counts.get('members-join-event-'+this._id)
  },
  'getTotalTopics': function(){
    return Topic.find({'event_id':this._id}).count();
  }
})
Template.placeHoldTemplate.onCreated(function(){

})
