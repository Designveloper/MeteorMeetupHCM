var google = {
  // Use OAuth Credentials of web application/client here, for oauth from web browser.
  // You have to create oAuth credentials for webclient from Google dev console.
  // see https://github.com/sujith3g/meteor-g-plus/blob/master/public/screnshots/create.png
  clientId: "261317114951-92baqvgt34b9qjsgeku3ddff65o71lbl.apps.googleusercontent.com",
  clientSecret: "l8pTajiPNKeFXi4zFZ5uJss9",
  //
  //Localhost
  //clientId: "261317114951-f4qv166tm6692si049lmta6qa7mdh638.apps.googleusercontent.com",
  //clientSecret: "WMrhg9hNYC311b5VVHo4Za-L",
  loginStyle: "redirect"
};

Meteor.startup(function() {

  Accounts.loginServiceConfiguration.remove({
    service: "google"
  });

  Accounts.loginServiceConfiguration.insert({
    service: "google",
    clientId: google.clientId,
    secret: google.clientSecret,
    loginStyle: google.loginStyle
  });

});

Meteor.startup(function(){
  Meteor.call('sm_user_update_groups');
  Meteor.call('group_create_sm');
  Meteor.call('event_create_sm');
  Meteor.call('vote_create_sm');
  Meteor.call('topic_create_sm');
  Meteor.call('beacon_create_sm');
})

