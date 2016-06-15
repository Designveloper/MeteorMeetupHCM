Meteor.startup(function(){
  Meteor.call('vote_create_sm');
  Meteor.call('topic_create_sm');
})