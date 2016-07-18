Template.registerHelper('formatTime', function (time) {
  if (time == '')
    return time;
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