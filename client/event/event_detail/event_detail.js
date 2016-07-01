Template.eventDetailTemplate.helpers({
  'event': function(){
    var events =  EventData.find({_id: ENUM.eventId()}).fetch();
    if (events.length){
      return events[0]
    }
  },
  'isOpening': function(){
    return (this.status == ENUM.EVENT_STATUS.OPENING)
  },
  'pathForEvent': function(){
    var groups = Group.find({_id: this.group_id}).fetch();
    if (!groups.length)
      return false;
    var group =groups[0];
    return [
      {name: group.name, _id: group._id, type: "group"},
      {name: this.name, _id: this._id, type: "event"}]

  }
})