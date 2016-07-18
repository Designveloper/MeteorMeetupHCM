Template.addTopicTemplate.helpers({
  'topics': function(){
    var topics = Session.get('new-event-topics');
    if (Array.isArray(topics)){
      return topics;
    }
    return [];
  }
})
