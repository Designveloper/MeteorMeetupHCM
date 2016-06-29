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

Accounts.config({
  // forbidClientAccountCreation: true,
  loginExpirationInDays: 0,
  // restrictCreationByEmailDomain: function(emailId) {
  //     var domainAllowed = ["hedcet.com"];
  //     var domain = emailId.slice(emailId.lastIndexOf("@") + 1);
  //     return _.contains(domainAllowed, domain);
  // },
  // sendVerificationEmail: true
});

Accounts.onCreateUser(function(opts, user) {
  if (!user.services.google)
    return user;
  var res = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      "User-Agent": "Meteor/1.0"
    },

    params: {
      access_token: user.services.google.accessToken
    }
  });

  if (res.error)
    throw res.error;

  user.profile = _.pick(res.data, "email", "email_verified", "gender", "locale", "name", "picture", "sub");

  return user;
});

Meteor.startup(function(){
  Meteor.call('sm_user_update_groups');
  Meteor.call('group_create_sm');
  Meteor.call('event_create_sm');
  Meteor.call('vote_create_sm');
  Meteor.call('topic_create_sm');
})

