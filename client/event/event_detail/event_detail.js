Template.eventDetailTemplate.helpers({
  'event': function(){
    var events =  EventData.find({_id: ENUM.eventId()}).fetch();
    if (events.length){
      return events[0]
    }
  },
  'isOpening': function(){
    return (this.status == ENUM.EVENT_STATUS.OPENING)
  }
})