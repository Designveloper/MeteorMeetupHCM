Meteor.methods({
  'event_create': function (data) {
    checkRolesInFunction();
    var topics = data.topics;
    delete data.topics;
    data.date = new Date(data.date);
    data.status = ENUM.EVENT_STATUS.OPENING;
    data.max_mem = data.max_mem || 0;
    var eventId = EventData.insert(data);
    if (Array.isArray(topics))
      for (let topic of topics) {
        delete topic.index;
        topic.event_id = eventId;
        Topic.insert(topic);
      }
  },
  'event_update': function (data) {
    checkRolesInFunction();
    var eventId = data.event_id;
    delete data.event_id;
    data.date = new Date(data.date);
    data.max_mem = data.max_mem || 0;
    EventData.update({_id: eventId}, {$set: data});
  }
})
