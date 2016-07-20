Meteor.startup(function() {
  var settings = getSettings();
  for (let service of ["google","facebook"]) {
    var configure = settings.accounts[service];
    Accounts.loginServiceConfiguration.remove({
      service: service
    });

    Accounts.loginServiceConfiguration.insert(_.extend({
      service: service,
    },configure));
  }
});

Meteor.startup(function(){
  //Meteor.call('sm_user_update_groups');
  //Meteor.call('group_create_sm');
  //Meteor.call('event_create_sm');
  //Meteor.call('vote_create_sm');
  //Meteor.call('topic_create_sm');
  //Meteor.call('beacon_create_sm');
})

