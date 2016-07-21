Template.registerHelper('formatTime', function (time) {
  if (time == '')
    return time;
  return moment(ENUM.formatDateObject(time)).format('MM/DD/YYYY, hh:mm:ss');
});

Template.registerHelper('emailUser', function (user) {
  return ENUM.getEmailCurrentUser(user || this);
});
Template.registerHelper('nameUser', function (user) {
  return ENUM.getNameCurrentUser(user || this);
});
Template.registerHelper('isOwnerGroup', function (id) {
  var roles = Roles.find(_.extend(ENUM.roles.QUERY('group','organizer'),{
    userId: Meteor.userId(),
    ref: id || ENUM.groupId()
  })).fetch();
  return !!roles.length;

});

Template.registerHelper('isManageGroup', function (id) {
  var roles = Roles.find(_.extend(ENUM.roles.QUERY('group',ENUM.roles.getPermssionRoles('group','manage')),{
    userId: Meteor.userId(),
    ref: id || ENUM.groupId()
  })).fetch();
  return !!roles.length;

})
Template.registerHelper('isHavePermission', function (type, action) {
  var role = ENUM.roles.getRoleCurrentUser(type, ENUM.roles.getRef(type));
  var permission = ENUM.roles.getPermssionRoles(type,action);

  return role && permission.indexOf(role.type.text) >=0;

})
Template.registerHelper('imageSrc', function (image) {
  if (image) {
    Meteor.subscribe('imageById', image);
    var imgs = Images.find({_id: image}).fetch();
    if (imgs.length)
      return imgs[0].url();
    return image;
  }
  return "/img/no-avatar.png"
});
Template.registerHelper('attachSrc', function (image) {
  if (image) {
    Meteor.subscribe('attachById', image);
    var imgs = Images.find({_id: image}).fetch();
    if (imgs.length)
      return imgs[0].url();
    return image;
  }
  return ""
});