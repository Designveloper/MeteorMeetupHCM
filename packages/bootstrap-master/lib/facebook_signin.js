Template.facebookSignin.events({
  'click #at-facebook': function(){
    facebookConnectPlugin.login(['public_profile','email'], function(data){
      data.cordova = true;
      Accounts.callLoginMethod({
        methodArguments: [data],
        userCallback: function(err, res){
          if (err){
            console.error(err);
          }
          console.log(res)
        }
      });
    }, function(err){
        alert(err);
    })
  }
})