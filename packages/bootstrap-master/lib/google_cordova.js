Template.googleSignIn.events({
  'click #at-google': function() {
    if (Meteor.isCordova) { // signIn through cordova
      Meteor.cordova_g_plus({
        cordova_g_plus: true,
        profile: ["email", "email_verified", "gender", "locale", "name", "picture"] // customized Meteor.user() pfofile ["email", "email_verified", "family_name", "gender", "given_name", "locale", "name", "picture", "profile", "sub"]
      }, function(error) {
        if (error) alert(error);
        // else location.reload();
      });
    }
  }
});
