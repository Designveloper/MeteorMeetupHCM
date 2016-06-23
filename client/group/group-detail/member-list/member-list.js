Template.memberListTemplate.helpers({
  'members': function(){
    return Meteor.users.find({groups: ENUM.groupId()}).fetch();
  },
  'avatar': function () {
    return ENUM.getAvatarCurrentUser(this) || ENUM.NO_AVATAR;
  },
  'email': function () {
  return ENUM.getEmailCurrentUser(this);
  },
  'name': function(){
    return ENUM.getNameCurrentUser(this);
  },
  getRouteProfile: function(){
    return "/user-profile/"+this._id;
  }
})
