Meteor.methods({
  'event_create': function(data){
    checkRolesInFunction();
    var topics = data.topics;
    delete data.topics;
    data.date = new Date(data.date);
    data.status = ENUM.EVENT_STATUS.OPENING;
    var eventId = EventData.insert(data);
    for (let topic of topics){
      delete topic.index;
      topic.event_id = eventId;
      Topic.insert(topic);
    }
  }
})
