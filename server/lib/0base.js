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
