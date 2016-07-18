Template.registerHelper('formatTime', function (time) {
  return moment(ENUM.formatDateObject(time)).format('MM/DD/YYYY, hh:mm:ss');
})
Template.registerHelper('isOwnerGroup', function (id) {
  var roles = Roles.find({
    userId: Meteor.userId(),
    type: ENUM.ROLES_TYPE['owner_group'],
    ref: id || ENUM.groupId()
  }).fetch();
  return !!roles.length;

})