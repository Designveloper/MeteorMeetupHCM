checkRolesInFunction = function (doRole, userId) {
  if (!Meteor.userId() || ENUM.getUserById(userId))
    throw  ENUM.ERROR(403);
};
getSelector = function (selector) {
  var baseSelector = {
    delete_flg: {$ne: 1}
  };
  return _.extend(baseSelector, selector);
};
detectEnv = function(){
  var appFolder = process.env.PWD;
  var lastEnv = "";
  for (let env in Meteor.settings.env_address){
    var addr = Meteor.settings.env_address[env]
    if (appFolder === addr){
      return env;
    }
    if (addr === "default"){
      lastEnv = env;
    }
  }
  return lastEnv;
};

getSettings = function(){
  var env = detectEnv();
  return Meteor.settings[env];
}