
checkRolesInFunction = function (doRole, userId) {
  if (!Meteor.userId() || ENUM.getUserById(userId))
    throw  ENUM.ERROR(403);
};