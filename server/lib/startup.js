Meteor.startup(function(){
  Meteor.call('group_create_sm');
  Meteor.call('event_create_sm');
  Meteor.call('vote_create_sm');
  Meteor.call('topic_create_sm');
})