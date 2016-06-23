Meteor.startup(function(){
  Meteor.call('sm_user_update_groups');
  Meteor.call('group_create_sm');
  Meteor.call('event_create_sm');
  Meteor.call('vote_create_sm');
  Meteor.call('topic_create_sm');
})