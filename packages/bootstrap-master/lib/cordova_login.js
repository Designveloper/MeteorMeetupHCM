var Request = Npm.require('request');
var Future = Npm.require("fibers/future");
var getRequest = function(url){
  try {
    var data = {
      data: {}
    };
    var doRequest = function(){
      var future = new Future;
      Request.get(url, function (error, res, body) {
        if (error){
          throw error;
        }
        data = body;
        return future.return();
      })
      return future;
    };
    doRequest().wait();
    return JSON.parse(data);
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
      {response: err.response});
  }
}
var getIdentity = function (accessToken) {
  console.log('accessToken',accessToken);
  var res = getRequest("https://graph.facebook.com/v2.5/me?fields=id,name,email&access_token="+accessToken);
  console.log('request res',res);
  return res;
};

var getProfilePicture = function (accessToken) {
  var res =getRequest("https://graph.facebook.com/v2.5/me/picture/?redirect=false?access_token="+accessToken);
  console.log('picture',res);
  if (!res.data)
    return '';
  return res.data.url;
};
Accounts.registerLoginHandler(function(loginRequest) {
  if(!loginRequest.cordova) {
    return undefined;
  }

  loginRequest = loginRequest.authResponse;
  console.log('loginRequest',loginRequest);

  var identity = getIdentity(loginRequest.accessToken);
  var profilePicture = getProfilePicture(loginRequest.accessToken);

  var serviceData = {
    accessToken: loginRequest.accessToken,
    expiresAt: (+new Date) + (1000 * loginRequest.expiresIn)
  };

  serviceData = _.extend(serviceData, identity);
  var options = {
    profile: {}
  };
  options.profile.name = identity.name;
  options.profile.avatar = 'https://graph.facebook.com/'+loginRequest.userID+'/picture?type=large';
  console.log('serviceData',serviceData);
  console.log('options', options);
  // https://github.com/meteor/meteor/blob/devel/packages/accounts-base/accounts_server.js#L1129
  console.log('isOnCreateHook', !!Accounts._onCreateUserHook);
  return Accounts.updateOrCreateUserFromExternalService("facebook", serviceData, options);

});

